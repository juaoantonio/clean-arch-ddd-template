import { AggregateRoot } from "@domain/@shared/aggregate-root";
import { Uuid } from "@domain/@shared/value-objects/uuid.vo";

export class ExampleEntityId extends Uuid {}

export class ExampleEntity extends AggregateRoot<ExampleEntityId> {
  constructor(
    id: ExampleEntityId,
    private name: string,
  ) {
    super(id);
    this.name = name;
  }

  public static create(name: string): ExampleEntity {
    const id = ExampleEntityId.random();
    return new ExampleEntity(id, name);
  }

  public getName(): string {
    return this.name;
  }
}
