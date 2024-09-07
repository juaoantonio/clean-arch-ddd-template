import { expect, it } from "vitest";
import { Uuid } from "@domain/@shared/value-objects/uuid.vo";

it("should not create a Uuid with invalid string", () => {
  expect(() => Uuid.create("1")).toThrowError("UUID inválido");
});
