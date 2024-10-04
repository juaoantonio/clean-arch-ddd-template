import { IModelMapper } from "@core/@shared/infra/db/model.mapper.interface";
import {
  ExampleAggregateRoot,
  ExampleAggregateRootId,
} from "@core/example/domain/example.aggregate";
import { ExampleModel } from "@core/example/infra/db/typeorm/example.model";
import { EntityValidationError } from "@core/@shared/domain/validators/validation.error";

export class ExampleModelMapper
  implements IModelMapper<ExampleAggregateRoot, ExampleModel>
{
  static create(): ExampleModelMapper {
    return new ExampleModelMapper();
  }

  toDomain(model: ExampleModel): ExampleAggregateRoot {
    const domainModel = new ExampleAggregateRoot(
      ExampleAggregateRootId.create(model.id),
      model.name,
      model.age,
    );
    domainModel.validate();
    if (domainModel.notification.hasErrors()) {
      throw new EntityValidationError(domainModel.notification.toJSON());
    }
    return domainModel;
  }

  toModel(entity: ExampleAggregateRoot): ExampleModel {
    return new ExampleModel(
      entity.getId().getValue(),
      entity.getName(),
      entity.getAge(),
    );
  }
}
