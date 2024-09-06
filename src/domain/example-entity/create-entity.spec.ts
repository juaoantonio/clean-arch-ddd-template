import { expect, it } from "vitest";
import { Uuid } from "@domain/@shared/value-objects/uuid.vo";
import { ExampleEntity } from "@domain/example-entity/example-entity.aggregate";

it("should create the example entity", () => {
  const exampleEntity = new ExampleEntity(
    Uuid.create("7f1dd3e7-461e-41af-9d35-5a1cde788cdd"),
    "Example Name",
  );

  expect(exampleEntity.getId()).toBe("7f1dd3e7-461e-41af-9d35-5a1cde788cdd");
  expect(exampleEntity.getName()).toBe("Example Name");
});
