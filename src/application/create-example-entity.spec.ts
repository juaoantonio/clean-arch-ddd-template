import { expect, it } from "vitest";
import { ExampleEntityRepository } from "@domain/example-entity/example-entity.repository";
import { ExampleEntity } from "@domain/example-entity/example-entity.aggregate";
import { CreateExampleEntityUseCase } from "@application/create-example-entity.use-case";

class InMemoryExampleEntityRepository implements ExampleEntityRepository {
  private data: ExampleEntity[] = [];
  async save(entity: ExampleEntity): Promise<string> {
    this.data.push(entity).toString();
    return entity.getId();
  }

  async findById(id: string): Promise<ExampleEntity> {
    const result = this.data.find((entity) => entity.getId() === id);
    if (!result) {
      throw new Error(`Entity with id ${id} not found`);
    }

    return result;
  }
}

it("should create and persist an Example Entity", async () => {
  const repository = new InMemoryExampleEntityRepository();
  const createExampleEntity = new CreateExampleEntityUseCase(repository);

  const { id } = await createExampleEntity.execute({ name: "Example Entity" });

  const entity = await repository.findById(id);
  expect(entity.getName()).toBe("Example Entity");
  expect(entity.getId()).toBe(id);
});
