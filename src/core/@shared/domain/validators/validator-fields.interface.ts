import { INotification } from "./notification.interface";

/**
 * Tipo que representa os erros de campos.
 * Pode ser um objeto com campo e mensagens de erro ou uma string simples.
 */
export type FieldsErrors =
  | {
      [field: string]: string[];
    }
  | string;

/**
 * Interface que define um validador de campos.
 */
export interface IValidatorFields {
  /**
   * Realiza a validação dos dados e adiciona erros à notificação fornecida.
   *
   * @param {INotification} notification - Instância para registro dos erros.
   * @param {any} data - Dados a serem validados.
   * @param {string[]} [fields] - Lista opcional de campos a serem validados.
   */
  validate(notification: INotification, data: any, fields?: string[]): void;
}
