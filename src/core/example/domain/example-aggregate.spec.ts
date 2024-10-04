import { expect, it } from "vitest";
import { ExampleAggregateRoot } from "./example.aggregate";
import { Uuid } from "../../@shared/domain/value-objects/uuid.vo";

it("should create the example entity", () => {
  const exampleEntity = new ExampleAggregateRoot(
    Uuid.create("7f1dd3e7-461e-41af-9d35-5a1cde788cdd"),
    "Example Name",
    18,
  );
  expect(exampleEntity.getId().getValue()).toBe(
    "7f1dd3e7-461e-41af-9d35-5a1cde788cdd",
  );
  expect(exampleEntity.getName()).toBe("Example Name");
});

it("should change the example entity name", () => {
  const exampleEntity = new ExampleAggregateRoot(
    Uuid.create("7f1dd3e7-461e-41af-9d35-5a1cde788cdd"),
    "Example Name",
    18,
  );
  exampleEntity.changeName("New Name");
  expect(exampleEntity.getName()).toBe("New Name");
});

it("should change the example entity age", () => {
  const exampleEntity = new ExampleAggregateRoot(
    Uuid.create("7f1dd3e7-461e-41af-9d35-5a1cde788cdd"),
    "Example Name",
    18,
  );
  exampleEntity.changeAge(20);
  expect(exampleEntity.getAge()).toBe(20);
  expect(exampleEntity.notification.hasErrors()).toBe(false);
});

it("should have validation error when trying to create a example with age less than 18", () => {
  const exampleEntity = ExampleAggregateRoot.create("Example Name", 17);
  expect(exampleEntity.notification.hasErrors()).toBe(true);
  expect(exampleEntity.notification.errors.has("age")).toBe(true);
  expect(exampleEntity.notification).notificationContainsErrorMessages([
    {
      age: ["Deve ser maior de idade"],
    },
  ]);
});

it("should have validation error when trying to create a example with negative age", () => {
  const exampleEntity = ExampleAggregateRoot.create("Example Name", -1);
  expect(exampleEntity.notification.hasErrors()).toBe(true);
  expect(exampleEntity.notification.errors.has("age")).toBe(true);
  expect(exampleEntity.notification).notificationContainsErrorMessages([
    {
      age: ["Deve ser maior de idade", "Idade deve ser um número positivo"],
    },
  ]);
});

it("should have validation error when trying to change age with a value less than 18", () => {
  const exampleEntity = ExampleAggregateRoot.create("Example Name", 18);
  exampleEntity.changeAge(17);
  expect(exampleEntity.notification.hasErrors()).toBe(true);
  expect(exampleEntity.notification.errors.has("age")).toBe(true);
  expect(exampleEntity.notification).notificationContainsErrorMessages([
    {
      age: ["Deve ser maior de idade"],
    },
  ]);
});

it("should have validation error when trying to change age with a negative value", () => {
  const exampleEntity = ExampleAggregateRoot.create("Example Name", 18);
  exampleEntity.changeAge(-1);
  expect(exampleEntity.notification.hasErrors()).toBe(true);
  expect(exampleEntity.notification.errors.has("age")).toBe(true);
  expect(exampleEntity.notification).notificationContainsErrorMessages([
    {
      age: ["Idade deve ser um número positivo", "Deve ser maior de idade"],
    },
  ]);
});
