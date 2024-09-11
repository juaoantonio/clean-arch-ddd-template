import { Identifier } from "@domain/@shared/identifier";
import { INotification } from "@domain/@shared/validation/notification.interface";
import { Notification } from "@domain/@shared/validation/notification";

export abstract class Entity<ID extends Identifier> {
  private readonly id: ID;
  private readonly notification: INotification = new Notification();

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
