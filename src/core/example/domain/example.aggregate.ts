import { Uuid } from "../../@shared/domain/value-objects/uuid.vo";
import { AggregateRoot } from "../../@shared/domain/aggregate-root";
import { ExampleValidatorFactory } from "@core/example/domain/example.validator";

export class ExampleAggregateRootId extends Uuid {}

export class ExampleAggregateRoot extends AggregateRoot<ExampleAggregateRootId> {
  constructor(
    id: ExampleAggregateRootId,
    private name: string,
    private age: number,
  ) {
    super(id);
    this.name = name;
  }

  public static create(name: string, age: number): ExampleAggregateRoot {
    const id = ExampleAggregateRootId.random();
    const aggregate = new ExampleAggregateRoot(id, name, age);
    aggregate.validate();
    return aggregate;
  }

  validate(fields?: string[]): void {
    const validator = ExampleValidatorFactory.create();
    validator.validate(this.notification, this, fields);
  }

  public getName(): string {
    return this.name;
  }

  public getAge(): number {
    return this.age;
  }

  public changeName(name: string): void {
    this.name = name;
  }

  public changeAge(age: number): void {
    this.age = age;
    this.validate(["age"]);
  }
}
