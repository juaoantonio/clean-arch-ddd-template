import { Identifier } from "./identifier";
import { INotification } from "./validators/notification.interface";
import { NotificationImplementation } from "./validators/notification-implementation";

/**
 * Base class for all domain entities.
 *
 * @template ID - Type of the identifier which must extend Identifier.
 */
export abstract class Entity<ID extends Identifier> {
  /**
   * Instance of INotification to manage entity notifications and errors.
   */
  public readonly notification: INotification =
    new NotificationImplementation();

  /**
   * Unique identifier of the entity.
   */
  private readonly id: ID;

  /**
   * Creates a new instance of Entity.
   *
   * @param {ID} id - Unique identifier of the entity.
   */
  constructor(id: ID) {
    this.id = id;
  }

  /**
   * Gets the identifier of the entity.
   *
   * @returns {ID} Entity identifier.
   */
  public getId(): ID {
    return this.id;
  }

  /**
   * Checks if the current entity is equal to another entity.
   *
   * @param {Entity<ID>} entity - Entity to be compared.
   * @returns {boolean} True if the entities are equal, false otherwise.
   */
  public equals(entity: Entity<ID>): boolean {
    return this.id.equals(entity.id);
  }
}
