import { Identifier } from "@core/@shared/domain/identifier";
import { AggregateRoot } from "@core/@shared/domain/aggregate-root";
import { IRepository } from "@core/@shared/domain/repository/repository.interface";
import { EntityNotFoundError } from "@core/@shared/domain/error/entity-not-found.error";
import { InvalidArgumentError } from "@core/@shared/domain/error/invalid-argument.error";

export abstract class InMemoryRepository<
  AggregateId extends Identifier,
  A extends AggregateRoot<AggregateId>,
> implements IRepository<AggregateId, A>
{
  items: A[] = [];

  async save(aggregate: A): Promise<void> {
    this.items.push(aggregate);
  }

  async saveMany(aggregate: any[]): Promise<void> {
    this.items.push(...aggregate);
  }

  async update(aggregate: A): Promise<void> {
    const indexFound = this.items.findIndex((item) =>
      item.getId().equals(aggregate.getId()),
    );
    if (indexFound === -1) {
      throw new EntityNotFoundError(aggregate.getId(), this.getEntity());
    }
    this.items[indexFound] = aggregate;
  }

  async delete(aggregateId: AggregateId): Promise<void> {
    const indexFound = this.items.findIndex((item) =>
      item.getId().equals(aggregateId),
    );
    if (indexFound === -1) {
      throw new EntityNotFoundError(aggregateId, this.getEntity());
    }
    this.items.splice(indexFound, 1);
  }

  async deleteManyByIds(aggregateIds: AggregateId[]): Promise<void> {
    const notFoundIds = [];
    aggregateIds.forEach((id) => {
      const indexFound = this.items.findIndex((item) =>
        item.getId().equals(id),
      );
      if (indexFound === -1) {
        notFoundIds.push(id);
      }
    });
    if (notFoundIds.length) {
      throw new EntityNotFoundError(notFoundIds, this.getEntity());
    }

    this.items = this.items.filter((item) => {
      return !aggregateIds.some((entityId) => item.getId().equals(entityId));
    });
  }

  async findById(ids: AggregateId): Promise<A | null> {
    const item = this.items.find((item) => item.getId().equals(ids));
    return typeof item === "undefined" ? null : item;
  }

  async findMany(): Promise<A[]> {
    return this.items;
  }

  async findManyByIds(ids: AggregateId[]): Promise<A[]> {
    return this.items.filter((entity) => {
      return ids.some((id) => entity.getId().equals(id));
    });
  }

  async existsById(
    ids: AggregateId[],
  ): Promise<{ exists: AggregateId[]; notExists: AggregateId[] }> {
    if (!ids.length) {
      throw new InvalidArgumentError(
        "ids must be an array with at least one element",
      );
    }

    if (this.items.length === 0) {
      return {
        exists: [],
        notExists: ids,
      };
    }

    const existsId = new Set<AggregateId>();
    const notExistsId = new Set<AggregateId>();
    ids.forEach((id) => {
      const item = this.items.find((aggregate) => aggregate.getId().equals(id));
      item ? existsId.add(id) : notExistsId.add(id);
    });
    return {
      exists: Array.from(existsId.values()),
      notExists: Array.from(notExistsId.values()),
    };
  }

  abstract getEntity(): new (...args: any[]) => A;
}
