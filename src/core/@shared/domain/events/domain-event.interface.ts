import { Identifier } from "../identifier";

/*
 * @interface IDomainEvent
 * @description Interface de evento de domínio.
 * @prop aggregateId: Identificador da entidade.
 * @prop occurredOn: Data de ocorrência do evento.
 */
export interface IDomainEvent {
  aggregateId: Identifier;
  occurredOn: Date;
}
