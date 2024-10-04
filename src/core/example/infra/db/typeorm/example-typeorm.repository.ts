import { IExampleRepository } from "@core/example/domain/example.repository";
import {
  ExampleAggregateRoot,
  ExampleAggregateRootId,
} from "@core/example/domain/example.aggregate";
import { ExampleModel } from "@core/example/infra/db/typeorm/example.model";
import { In, Repository } from "typeorm";
import { ExampleModelMapper } from "@core/example/infra/db/typeorm/example.model.mapper";
import { InvalidArgumentError } from "@core/@shared/domain/error/invalid-argument.error";
import { EntityNotFoundError } from "@core/@shared/domain/error/entity-not-found.error";

export class ExampleTypeormRepository implements IExampleRepository {
  private readonly modelMapper: ExampleModelMapper = new ExampleModelMapper();

  constructor(
    // O nome pode confundir, mas o que está sendo injetado é um repositório do TypeORM, não um repositório do domínio
    private readonly exampleModelRepository: Repository<ExampleModel>,
  ) {}

  async save(aggregate: ExampleAggregateRoot): Promise<void> {
    const modelProps = this.modelMapper.toModel(aggregate);
    await this.exampleModelRepository.save(modelProps);
  }

  async saveMany(aggregate: ExampleAggregateRoot[]): Promise<void> {
    const modelsProps = aggregate.map((entity) =>
      this.modelMapper.toModel(entity),
    );
    await this.exampleModelRepository.save(modelsProps);
  }

  async update(aggregate: ExampleAggregateRoot): Promise<void> {
    const modelProps = this.modelMapper.toModel(aggregate);
    await this.exampleModelRepository.update(modelProps.id, modelProps);
  }

  async findById(
    aggregateId: ExampleAggregateRootId,
  ): Promise<ExampleAggregateRoot | null> {
    const model = await this.exampleModelRepository.findOne({
      where: { id: aggregateId.getValue() },
    });
    if (!model) return null;
    return this.modelMapper.toDomain(model);
  }

  async findMany(): Promise<ExampleAggregateRoot[]> {
    const models = await this.exampleModelRepository.find();
    return models.map((model) => this.modelMapper.toDomain(model));
  }

  async findManyByIds(
    aggregateIds: ExampleAggregateRootId[],
  ): Promise<ExampleAggregateRoot[]> {
    const models = await this.exampleModelRepository.find({
      where: {
        id: In(aggregateIds.map((id) => id.getValue())),
      },
    });
    return models.map((model) => this.modelMapper.toDomain(model));
  }

  async delete(aggregateId: ExampleAggregateRootId): Promise<void> {
    const affectedRows = await this.exampleModelRepository.delete(
      aggregateId.getValue(),
    );
    if (affectedRows.affected !== 1) {
      throw new EntityNotFoundError(aggregateId.getValue(), this.getEntity());
    }
  }

  async deleteManyByIds(aggregateIds: ExampleAggregateRootId[]): Promise<void> {
    for (const id of aggregateIds) {
      const everyIdExists = await this.existsById([id]);
      if (everyIdExists.notExists.length) {
        throw new EntityNotFoundError(
          everyIdExists.notExists.map((id) => id.getValue()),
          this.getEntity(),
        );
      }
      await this.exampleModelRepository.delete(id.getValue());
    }
  }

  async existsById(aggregateIds: ExampleAggregateRootId[]): Promise<{
    exists: ExampleAggregateRootId[];
    notExists: ExampleAggregateRootId[];
  }> {
    if (!aggregateIds.length) {
      throw new InvalidArgumentError("ids do agregado não podem ser vazios");
    }
    const existsModels = await this.exampleModelRepository.find({
      where: {
        id: In(aggregateIds.map((id) => id.getValue())),
      },
    });
    const existsIds = existsModels.map((model) =>
      ExampleAggregateRootId.create(model.id),
    );
    const notExistsIds = aggregateIds.filter(
      (id) => !existsIds.find((existsId) => existsId.equals(id)),
    );
    return {
      exists: existsIds,
      notExists: notExistsIds,
    };
  }

  getEntity(): new (...args: any[]) => ExampleAggregateRoot {
    return ExampleAggregateRoot;
  }
}
