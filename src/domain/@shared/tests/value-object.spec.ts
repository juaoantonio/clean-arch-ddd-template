import { describe, expect, it } from "vitest";
import { ValueObject } from "@domain/@shared/value-object";

class ExampleValueObject extends ValueObject {
  constructor(private readonly value: string) {
    super();
  }
}

class ComplexValueObject extends ValueObject {
  constructor(
    private readonly value: string,
    private readonly value2: string,
  ) {
    super();
  }
}

describe("Value Object Unit Tests", () => {
  it("should be equals", () => {
    const vo1 = new ExampleValueObject("value");
    const vo2 = new ExampleValueObject("value");
    expect(vo1.equals(vo2)).toBe(true);
    expect(vo1.equals(null)).toBe(false);

    const vo3 = new ComplexValueObject("value", "value2");
    const vo4 = new ComplexValueObject("value", "value2");
    expect(vo3.equals(vo4)).toBe(true);
    expect(vo1.equals(null)).toBe(false);
  });

  it("should not be equals", () => {
    const vo1 = new ExampleValueObject("value");
    const vo2 = new ExampleValueObject("value2");
    expect(vo1.equals(vo2)).toBe(false);

    const vo3 = new ComplexValueObject("value", "value2");
    const vo4 = new ComplexValueObject("value2", "value");
    expect(vo3.equals(vo4)).toBe(false);
  });
});
