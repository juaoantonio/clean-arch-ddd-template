import { InMemoryRepository } from "./in-memory-repository";
import { AggregateRoot } from "../../../domain/aggregate-root";
import { Uuid } from "../../../domain/value-objects/uuid.vo";
import { beforeEach, describe, expect, it } from "vitest";
import { EntityNotFoundError } from "../../../domain/error/entity-not-found.error";
import { InvalidArgumentError } from "../../../domain/error/invalid-argument.error";

class StubAggregateRoot extends AggregateRoot<Uuid> {
  constructor(
    id: Uuid,
    private name: string,
  ) {
    super(id);
  }

  getName(): string {
    return this.name;
  }

  changeName(name: string): void {
    this.name = name;
  }
}

class InMemoryRepositoryStub extends InMemoryRepository<
  Uuid,
  StubAggregateRoot
> {
  getEntity(): new (...args: any[]) => StubAggregateRoot {
    return StubAggregateRoot;
  }
}

describe("InMemoryRepository Unit Tests", () => {
  let repo: InMemoryRepositoryStub;

  beforeEach(() => {
    repo = new InMemoryRepositoryStub();
  });

  it("should find a aggregate root by id", async () => {
    const aggregate = new StubAggregateRoot(
      Uuid.create("58167383-9c77-489b-a9a1-05caaa373de9"),
      "John Doe",
    );
    await repo.save(aggregate);
    const itemFound = await repo.findById(aggregate.getId());
    expect(itemFound).toBe(aggregate);
  });

  it("should return null when a aggregate root is not found by id", async () => {
    const itemFound = await repo.findById(Uuid.random());
    expect(itemFound).toBeNull();
  });

  it("should save a aggregate root", async () => {
    const aggregate = new StubAggregateRoot(
      Uuid.create("58167383-9c77-489b-a9a1-05caaa373de9"),
      "John Doe",
    );
    await repo.save(aggregate);
    const allItems = await repo.findMany();
    expect(allItems).toHaveLength(1);
    const itemSaved = await repo.findById(aggregate.getId());
    expect(itemSaved).toBe(aggregate);
    expect(itemSaved.getId()).toBe(aggregate.getId());
    expect(itemSaved.getName()).toBe(aggregate.getName());
  });

  it("should save many aggregate roots", async () => {
    const aggregate1 = new StubAggregateRoot(
      Uuid.create("58167383-9c77-489b-a9a1-05caaa373de9"),
      "John Doe",
    );
    const aggregate2 = new StubAggregateRoot(
      Uuid.create("58167383-9c77-489b-a9a1-05caaa373de9"),
      "Jane Doe",
    );
    await repo.saveMany([aggregate1, aggregate2]);
    const allItems = await repo.findMany();
    expect(allItems).toHaveLength(2);
    expect(allItems).toContain(aggregate1);
    expect(allItems).toContain(aggregate2);
  });

  it("should update a aggregate root", async () => {
    const aggregate = new StubAggregateRoot(
      Uuid.create("58167383-9c77-489b-a9a1-05caaa373de9"),
      "John Doe",
    );
    await repo.save(aggregate);
    aggregate.changeName("Jane Doe");
    await repo.update(aggregate);
    const itemUpdated = await repo.findById(aggregate.getId());
    expect(itemUpdated).toBe(aggregate);
    expect(itemUpdated.getId()).toStrictEqual(
      Uuid.create("58167383-9c77-489b-a9a1-05caaa373de9"),
    );
    expect(itemUpdated.getName()).toBe("Jane Doe");
  });

  it("should delete a aggregate root", async () => {
    const aggregate = new StubAggregateRoot(
      Uuid.create("58167383-9c77-489b-a9a1-05caaa373de9"),
      "John Doe",
    );
    await repo.save(aggregate);
    await repo.delete(aggregate.getId());
    const allItems = await repo.findMany();
    expect(allItems).toHaveLength(0);
  });

  it("should delete many aggregate roots", async () => {
    const aggregate1 = new StubAggregateRoot(
      Uuid.create("58167383-9c77-489b-a9a1-05caaa373de9"),
      "John Doe",
    );
    const aggregate2 = new StubAggregateRoot(
      Uuid.create("58167383-9c77-489b-a9a1-05caaa373de9"),
      "Jane Doe",
    );
    await repo.saveMany([aggregate1, aggregate2]);
    await repo.deleteManyByIds([aggregate1.getId(), aggregate2.getId()]);
    const allItems = await repo.findMany();
    expect(allItems).toHaveLength(0);
  });

  it("should find many aggregate roots by ids", async () => {
    const aggregate1 = new StubAggregateRoot(
      Uuid.create("58167383-9c77-489b-a9a1-05caaa373de9"),
      "John Doe",
    );
    const aggregate2 = new StubAggregateRoot(
      Uuid.create("58167383-9c77-489b-a9a1-05caaa373de9"),
      "Jane Doe",
    );
    await repo.saveMany([aggregate1, aggregate2]);
    const itemsFound = await repo.findManyByIds([
      aggregate1.getId(),
      aggregate2.getId(),
    ]);
    expect(itemsFound).toHaveLength(2);
    expect(itemsFound).toContain(aggregate1);
    expect(itemsFound).toContain(aggregate2);
  });

  it("should check if a aggregate root exists by id", async () => {
    const aggregate = new StubAggregateRoot(
      Uuid.create("58167383-9c77-489b-a9a1-05caaa373de9"),
      "John Doe",
    );
    await repo.save(aggregate);
    const result = await repo.existsById([aggregate.getId()]);
    expect(result.notExists).toHaveLength(0);
    expect(result.exists[0]).toBe(aggregate.getId());
  });

  it("should check if a aggregate root does not exist by id", async () => {
    const result = await repo.existsById([Uuid.random()]);
    expect(result.exists).toHaveLength(0);
    expect(result.notExists).toHaveLength(1);
    expect(result.notExists[0]).toBeInstanceOf(Uuid);
  });

  it("should check if many aggregate roots exist by ids", async () => {
    const aggregate1 = new StubAggregateRoot(
      Uuid.create("58167383-9c77-489b-a9a1-05caaa373de9"),
      "John Doe",
    );
    const aggregate2 = new StubAggregateRoot(
      Uuid.create("58167383-9c77-489b-a9a1-05caaa373de9"),
      "Jane Doe",
    );
    await repo.saveMany([aggregate1, aggregate2]);
    const result = await repo.existsById([
      aggregate1.getId(),
      aggregate2.getId(),
    ]);
    expect(result.notExists).toHaveLength(0);
    expect(result.exists).toHaveLength(2);
    expect(result.exists).toContain(aggregate1.getId());
    expect(result.exists).toContain(aggregate2.getId());
  });

  it("should check if many aggregate roots do not exist by ids", async () => {
    const result = await repo.existsById([Uuid.random(), Uuid.random()]);
    expect(result.exists).toHaveLength(0);
    expect(result.notExists).toHaveLength(2);
    expect(result.notExists[0]).toBeInstanceOf(Uuid);
    expect(result.notExists[1]).toBeInstanceOf(Uuid);
  });

  it("should return both notExists and exists when existsByIds is called", async () => {
    const aggregate1 = new StubAggregateRoot(Uuid.random(), "John Doe");
    const aggregate2 = new StubAggregateRoot(Uuid.random(), "Jane Doe");
    const aggregate3 = new StubAggregateRoot(Uuid.random(), "John Does");
    await repo.saveMany([aggregate1, aggregate2]);
    const result = await repo.existsById([
      aggregate1.getId(),
      aggregate2.getId(),
      aggregate3.getId(),
    ]);
    expect(result.exists).toHaveLength(2);
    expect(result.notExists).toHaveLength(1);
    expect(result.exists).toContain(aggregate1.getId());
    expect(result.exists).toContain(aggregate2.getId());
    expect(result.notExists[0]).toBe(aggregate3.getId());
  });

  it("should throw EntityNotFoundError when trying to update a non-existent aggregate root", async () => {
    const aggregate = new StubAggregateRoot(
      Uuid.create("58167383-9c77-489b-a9a1-05caaa373de9"),
      "John Doe",
    );
    expect(async () => {
      await repo.update(aggregate);
    }).rejects.toThrowError(
      new EntityNotFoundError(
        Uuid.create("58167383-9c77-489b-a9a1-05caaa373de9"),
        StubAggregateRoot,
      ),
    );
  });

  it("should throw EntityNotFoundError when trying to delete a non-existent aggregate root", async () => {
    expect(async () => {
      await repo.delete(Uuid.create("58167383-9c77-489b-a9a1-05caaa373de9"));
    }).rejects.toThrowError(
      new EntityNotFoundError(
        Uuid.create("58167383-9c77-489b-a9a1-05caaa373de9"),
        StubAggregateRoot,
      ),
    );
  });

  it("should throw EntityNotFoundError when trying to delete many at least non-existent aggregate roots", async () => {
    const aggregate1 = new StubAggregateRoot(
      Uuid.create("58167383-9c77-489b-a9a1-05caaa373de8"),
      "John Doe",
    );
    await repo.save(aggregate1);
    expect(async () => {
      await repo.deleteManyByIds([
        Uuid.create("58167383-9c77-489b-a9a1-05caaa373de8"),
        Uuid.create("58167383-9c77-489b-a9a1-05caaa373de6"),
        Uuid.create("58167383-9c77-489b-a9a1-05caaa373de1"),
      ]);
    }).rejects.toThrowError(
      new EntityNotFoundError(
        [
          Uuid.create("58167383-9c77-489b-a9a1-05caaa373de6"),
          Uuid.create("58167383-9c77-489b-a9a1-05caaa373de1"),
        ],
        StubAggregateRoot,
      ),
    );
  });

  it("should throw InvalidArgumentError when passing invalid arguments to existsByIds", () => {
    expect(async () => {
      await repo.existsById([]);
    }).rejects.toThrowError(
      new InvalidArgumentError(
        "ids must be an array with at least one element",
      ),
    );
  });
});
