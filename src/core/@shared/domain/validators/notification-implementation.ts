import { INotification, ToJsonOutput } from "./notification.interface";

/**
 * Implementação da interface INotification para gerenciamento de notificações de erros.
 */
export class NotificationImplementation implements INotification {
  /**
   * Mapa que armazena os erros, onde a chave é o campo ou mensagem de erro,
   * e o valor é a mensagem ou lista de mensagens de erro.
   */
  errors = new Map<string, string[] | string>();

  /**
   * Adiciona um erro à notificação.
   *
   * @param {string} error - Mensagem de erro.
   * @param {string} [field] - Campo associado ao erro.
   */
  addError(error: string, field?: string): void {
    if (!field)
      this.errors.set(error, error); // erro sem campo associado
    else {
      const errors = (this.errors.get(field) ?? []) as string[];
      const errorNotExists = errors.indexOf(error) === -1;
      if (errorNotExists) errors.push(error);
      this.errors.set(field, errors);
    }
  }

  /**
   * Define um erro ou lista de erros para um campo específico.
   *
   * @param {string | string[]} error - Mensagem ou mensagens de erro.
   * @param {string} [field] - Campo associado aos erros.
   */
  setError(error: string | string[], field?: string): void {
    const isArrayOfErrors = Array.isArray(error);

    if (field) {
      this.errors.set(field, isArrayOfErrors ? error : [error]);
      return;
    }

    if (isArrayOfErrors) {
      error.forEach((err) => this.errors.set(err, err));
      return;
    }

    this.errors.set(error, error);
  }

  /**
   * Copia erros de outra instância de NotificationImplementation.
   *
   * @param {NotificationImplementation} notification - Instância da qual os erros serão copiados.
   */
  copyErrors(notification: NotificationImplementation): void {
    notification.errors.forEach((value, field) => this.setError(value, field));
  }

  /**
   * Verifica se existem erros na notificação.
   *
   * @returns {boolean} True se houver erros, false caso contrário.
   */
  hasErrors(): boolean {
    return this.errors.size > 0;
  }

  /**
   * Converte os erros armazenados para um formato JSON.
   *
   * @returns {any} Array contendo as mensagens de erro.
   */
  toJSON(): any {
    const errors: ToJsonOutput = [];

    for (const [field, error] of this.errors.entries()) {
      if (typeof error === "string") errors.push(error);
      else errors.push({ [field]: error });
    }
    return errors;
  }
}
