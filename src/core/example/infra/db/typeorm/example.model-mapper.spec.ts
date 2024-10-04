import {
  ExampleAggregateRoot,
  ExampleAggregateRootId,
} from "@core/example/domain/example.aggregate";
import { ExampleModel } from "@core/example/infra/db/typeorm/example.model";
import { EntityValidationError } from "@core/@shared/domain/validators/validation.error";
import { ExampleModelMapper } from "@core/example/infra/db/typeorm/example.model.mapper";

describe("ExampleModelMapper", () => {
  let mapper: ExampleModelMapper;

  beforeEach(() => {
    mapper = ExampleModelMapper.create();
  });

  describe("toDomain", () => {
    it("should successfully map ExampleModel to ExampleAggregateRoot", () => {
      const model = new ExampleModel(
        "1b959518-32de-4ffe-89da-9062c27547e7",
        "Test Name",
        25,
      );

      const domain = mapper.toDomain(model);

      expect(domain.getId().getValue()).toBe(
        "1b959518-32de-4ffe-89da-9062c27547e7",
      );
      expect(domain.getName()).toBe("Test Name");
      expect(domain.getAge()).toBe(25);
    });

    it("should throw EntityValidationError when validation fails", () => {
      const model = new ExampleModel(
        ExampleAggregateRootId.random().getValue(),
        "Invalid Name",
        15,
      );

      expect(() => {
        mapper.toDomain(model);
      }).toThrow(EntityValidationError);
    });
  });

  describe("toModel", () => {
    it("should successfully map ExampleAggregateRoot to ExampleModel", () => {
      const aggregateId = ExampleAggregateRootId.create(
        "1b959518-32de-4ffe-89da-9062c27547e7",
      );
      const aggregate = new ExampleAggregateRoot(aggregateId, "Test Name", 30);

      const model = mapper.toModel(aggregate);

      expect(model.id).toBe("1b959518-32de-4ffe-89da-9062c27547e7");
      expect(model.name).toBe("Test Name");
      expect(model.age).toBe(30);
    });
  });
});
