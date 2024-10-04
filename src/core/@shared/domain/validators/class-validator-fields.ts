import { IValidatorFields } from "./validator-fields.interface";
import { validateSync } from "class-validator";
import { INotification } from "./notification.interface";

/**
 * Classe abstrata que implementa a interface de validação de campos utilizando o class-validator.
 * Responsável por validar objetos de dados e adicionar erros à notificação caso existam.
 */
export abstract class ClassValidatorFields implements IValidatorFields {
  /**
   * Realiza a validação dos dados fornecidos e adiciona os erros encontrados à notificação.
   *
   * @param {INotification} notification - Instância da notificação para armazenar os erros.
   * @param {any} data - Dados que serão validados.
   * @param {string[]} [fields] - Campos específicos que serão validados.
   */
  validate(notification: INotification, data: any, fields?: string[]): void {
    const errors = validateSync(data, {
      groups: fields,
    });

    if (errors.length > 0) {
      for (const error of errors) {
        const field = error.property;
        Object.values(error.constraints).forEach((message) => {
          notification.addError(message, field);
        });
      }
    }
  }
}
