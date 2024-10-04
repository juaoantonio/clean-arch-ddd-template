import { Identifier } from "./identifier";
import { Entity } from "./entity";
import EventEmitter2 from "eventemitter2";
import { IDomainEvent } from "./events/domain-event.interface";

/**
 * Base class for the aggregate root in DDD.
 * Extends Entity and manages domain events associated with the aggregate.
 *
 * @template ID - Type of the identifier which must extend Identifier.
 */
export abstract class AggregateRoot<ID extends Identifier> extends Entity<ID> {
  /**
   * Set of domain events that occurred in the aggregate.
   */
  public events: Set<IDomainEvent> = new Set<IDomainEvent>();

  /**
   * Local instance of EventEmitter2 for managing internal events.
   */
  private readonly localMediator = new EventEmitter2();

  /**
   * Creates a new instance of AggregateRoot.
   *
   * @param {ID} id - Unique identifier of the aggregate.
   */
  constructor(id: ID) {
    super(id);
  }

  /**
   * Applies a domain event to the aggregate.
   *
   * @param {IDomainEvent} event - The domain event to be applied.
   */
  public applyEvent(event: IDomainEvent) {
    this.events.add(event);
    this.localMediator.emit(event.constructor.name, event);
  }

  /**
   * Registers a handler for a specific event type.
   *
   * @param {string} event - Name of the event to listen to.
   * @param {(event: IDomainEvent) => void} handler - Function to handle the event.
   */
  public registerHandler(
    event: string,
    handler: (event: IDomainEvent) => void,
  ) {
    this.localMediator.on(event, handler);
  }
}
