import { Identifier } from "./identifier";
import { Entity } from "./entity";
import EventEmitter2 from "eventemitter2";
import { IDomainEvent } from "./events/domain-event.interface";

/**
 * Classe base para a raiz de agregação no DDD.
 * Estende Entity e gerencia eventos de domínio associados à agregação.
 *
 * @template ID - Tipo do identificador que deve estender Identifier.
 */
export abstract class AggregateRoot<ID extends Identifier> extends Entity<ID> {
  /**
   * Conjunto de eventos de domínio que ocorreram na agregação.
   */
  public events: Set<IDomainEvent> = new Set<IDomainEvent>();

  /**
   * Instância local do EventEmitter2 para gerenciamento de eventos internos.
   */
  private readonly localMediator = new EventEmitter2();

  /**
   * Cria uma nova instância de AggregateRoot.
   *
   * @param {ID} id - Identificador único da agregação.
   */
  constructor(id: ID) {
    super(id);
  }

  /**
   * Aplica um evento de domínio à agregação.
   *
   * @param {IDomainEvent} event - Evento de domínio a ser aplicado.
   */
  public applyEvent(event: IDomainEvent) {
    this.events.add(event);
    this.localMediator.emit(event.constructor.name, event);
  }

  /**
   * Registra um manipulador para um tipo específico de evento.
   *
   * @param {string} event - Nome do evento a ser escutado.
   * @param {(event: IDomainEvent) => void} handler - Função manipuladora do evento.
   */
  public registerHandler(
    event: string,
    handler: (event: IDomainEvent) => void,
  ) {
    this.localMediator.on(event, handler);
  }
}
