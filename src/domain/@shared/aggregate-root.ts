import { Identifier } from "@domain/@shared/identifier";
import { Entity } from "@domain/@shared/entity";

export abstract class AggregateRoot<ID extends Identifier> extends Entity<ID> {
  protected constructor(id: ID) {
    super(id);
  }
}
