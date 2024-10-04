import { AggregateRoot } from "../aggregate-root";
import { Uuid } from "../value-objects/uuid.vo";
import { describe, expect, it } from "vitest";
import { IDomainEvent } from "../events/domain-event.interface";

class StubEvent implements IDomainEvent {
  public aggregateId: Uuid;
  public occurredOn: Date;
  public readonly name: string;

  constructor(aggregateId: Uuid, occurredOn: Date, name: string) {
    this.aggregateId = aggregateId;
    this.occurredOn = new Date();
    this.name = name;
  }
}

class StubAggregateRoot extends AggregateRoot<Uuid> {
  public field1: string;
  private readonly name: string;

  constructor(id: Uuid, name: string, field1: string) {
    super(id);
    this.name = name;
    this.field1 = field1;

    this.registerHandler(StubEvent.name, this.onStubEvent.bind(this));
  }

  exampleOperation(): void {
    this.name.toUpperCase();
    this.applyEvent(new StubEvent(this.getId(), new Date(), this.name));
  }

  onStubEvent(event: StubEvent): void {
    this.field1 = event.name;
  }
}

describe("Aggregate Root Unit Tests", () => {
  it("should dispatch event", () => {
    const id = Uuid.random();
    const aggregateRoot = new StubAggregateRoot(id, "name", "field1");
    aggregateRoot.exampleOperation();

    expect(aggregateRoot.field1).toBe("name");
  });
});
