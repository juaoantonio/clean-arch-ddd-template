import { describe, expect, it } from "vitest";
import { Identifier } from "@domain/@shared/identifier";
import { Entity } from "@domain/@shared/entity";

class ExampleEntityId extends Identifier {
  constructor(private readonly value: string) {
    super();
  }
  getValue(): string {
    return this.value;
  }
}

class ExampleEntity extends Entity<ExampleEntityId> {
  constructor(
    id: ExampleEntityId,
    readonly someValue: string,
  ) {
    super(id);
  }
}

describe("Entity Unit Tests", () => {
  it("should be equals", () => {
    const e1 = new ExampleEntity(new ExampleEntityId("identifier"), "value1");
    const e2 = new ExampleEntity(new ExampleEntityId("identifier"), "value2");
    expect(e1.equals(e2)).toBe(true);
  });
});
