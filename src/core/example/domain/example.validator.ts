import { ExampleAggregateRoot } from "@core/example/domain/example.aggregate";
import { ClassValidatorFields } from "@core/@shared/domain/validators/class-validator-fields";
import { INotification } from "@core/@shared/domain/validators/notification.interface";
import { IsPositive, Min } from "class-validator";

class ExampleRules {
  @Min(18, { message: "Deve ser maior de idade", groups: ["age"] })
  @IsPositive({ message: "Idade deve ser um número positivo", groups: ["age"] })
  age: number;

  constructor(aggregate: ExampleAggregateRoot) {
    Object.assign(this, aggregate);
  }
}

export class ExampleValidator extends ClassValidatorFields {
  validate(
    notification: INotification,
    data: ExampleAggregateRoot,
    fields?: string[],
  ): void {
    const newFields = fields?.length ? fields : Object.keys(data);

    return super.validate(notification, new ExampleRules(data), newFields);
  }
}

export class ExampleValidatorFactory {
  static create() {
    return new ExampleValidator();
  }
}
