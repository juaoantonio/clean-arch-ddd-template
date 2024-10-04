import { Identifier } from "../identifier";

/*
 * @interface IDomainEvent
 * @description Domain event interface.
 * @prop aggregateId: Identifier of the entity.
 * @prop occurredOn: Date when the event occurred.
 */
export interface IDomainEvent {
  aggregateId: Identifier;
  occurredOn: Date;
}
