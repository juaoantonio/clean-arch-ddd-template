/**
 * Interface para notificação de erros de validação.
 */
export interface INotification {
  /**
   * Mapa que armazena os erros, onde a chave é o campo ou a mensagem de erro,
   * e o valor é a mensagem ou um array de mensagens de erro.
   */
  errors: Map<string, string | string[]>;

  /**
   * Adiciona um erro à notificação.
   *
   * @param {string} error - Mensagem de erro.
   * @param {string} [field] - Campo associado ao erro.
   */
  addError(error: string, field?: string): void;

  /**
   * Define um erro ou lista de erros para um campo específico.
   *
   * @param {string | string[]} error - Mensagem ou mensagens de erro.
   * @param {string} [field] - Campo associado aos erros.
   */
  setError(error: string | string[], field?: string): void;

  /**
   * Verifica se existem erros na notificação.
   *
   * @returns {boolean} True se houver erros, false caso contrário.
   */
  hasErrors(): boolean;

  /**
   * Copia erros de outra notificação.
   *
   * @param {INotification} notifications - Notificação de onde os erros serão copiados.
   */
  copyErrors(notifications: INotification): void;

  /**
   * Converte os erros para um formato JSON.
   *
   * @returns {ToJsonOutput} Array contendo as mensagens de erro.
   */
  toJSON(): ToJsonOutput;
}

/**
 * Tipo que define o formato de saída para o método toJSON.
 */
export type ToJsonOutput = Array<string | Record<string, string[]>>;
