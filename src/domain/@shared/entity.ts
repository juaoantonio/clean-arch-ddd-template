import { Identifier } from "@domain/@shared/identifier";

export abstract class Entity<ID extends Identifier> {
  private readonly id: ID;

  protected constructor(id: ID) {
    this.id = id;
  }

  public getId(): string {
    return this.id.getValue();
  }

  public equals(entity: Entity<ID>): boolean {
    return this.id.equals(entity.id);
  }
}
