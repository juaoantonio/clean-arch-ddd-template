import { Identifier } from "../identifier";
import { AggregateRoot } from "@core/@shared/domain/aggregate-root";

/*
 * @interface IRepository
 * @description Generic repository interface.
 * @template AggregateId - Type of the aggregate root identifier.
 * @template A - Type of the aggregate root.
 */
export interface IRepository<
  AggregateId extends Identifier,
  A extends AggregateRoot<AggregateId>,
> {
  save(aggregate: A): Promise<void>;

  saveMany(aggregate: A[]): Promise<void>;

  findById(aggregateId: AggregateId): Promise<A | null>;

  findMany(): Promise<A[]>;

  findManyByIds(aggregateIds: AggregateId[]): Promise<A[]>;

  update(aggregate: A): Promise<void>;

  delete(aggregateId: AggregateId): Promise<void>;

  deleteManyByIds(aggregateIds: AggregateId[]): Promise<void>;

  existsById(
    aggregateIds: AggregateId[],
  ): Promise<{ exists: AggregateId[]; notExists: AggregateId[] }>;

  getEntity(): new (...args: any[]) => A;
}
