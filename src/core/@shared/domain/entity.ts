import { Identifier } from "./identifier";
import { INotification } from "./validators/notification.interface";
import { NotificationImplementation } from "./validators/notification-implementation";

/**
 * Classe base para todas as entidades do domínio.
 *
 * @template ID - Tipo do identificador que deve estender Identifier.
 */
export abstract class Entity<ID extends Identifier> {
  /**
   * Instância de INotification para gerenciar notificações e erros da entidade.
   */
  public readonly notification: INotification =
    new NotificationImplementation();

  /**
   * Identificador único da entidade.
   */
  private readonly id: ID;

  /**
   * Cria uma nova instância de Entity.
   *
   * @param {ID} id - Identificador único da entidade.
   */
  constructor(id: ID) {
    this.id = id;
  }

  /**
   * Obtém o identificador da entidade.
   *
   * @returns {ID} Identificador da entidade.
   */
  public getId(): ID {
    return this.id;
  }

  /**
   * Verifica se a entidade atual é igual a outra entidade.
   *
   * @param {Entity<ID>} entity - Entidade a ser comparada.
   * @returns {boolean} True se as entidades forem iguais, false caso contrário.
   */
  public equals(entity: Entity<ID>): boolean {
    return this.id.equals(entity.id);
  }
}
