import { InMemoryRepository } from "@core/@shared/infra/db/in-memory/in-memory-repository";
import {
  ExampleAggregateRoot,
  ExampleAggregateRootId,
} from "@core/example/domain/example.aggregate";
import { CreateExampleUseCase } from "./create-example.use-case";

class StubExampleEntityRepository extends InMemoryRepository<
  ExampleAggregateRootId,
  ExampleAggregateRoot
> {
  getEntity() {
    return ExampleAggregateRoot;
  }
}

it("should create and persist an Example Entity", async () => {
  const repository = new StubExampleEntityRepository();
  const createExampleEntity = new CreateExampleUseCase(repository);

  await createExampleEntity.execute({ name: "Example Entity", age: 18 });

  const repoData = await repository.findMany();
  expect(repoData.length).toBe(1);
  const savedEntity = repoData[0];
  expect(savedEntity.getName()).toBe("Example Entity");
  expect(savedEntity.getId()).toBeDefined();
});

it("should not persist invalid entity", async () => {
  const repository = new StubExampleEntityRepository();
  const createExampleEntity = new CreateExampleUseCase(repository);

  expect(async () => {
    await createExampleEntity.execute({ name: "Example Entity", age: 17 });
  }).rejects.toThrowError("Entidade inválida");
});
