import { FieldsErrors } from "./validator-fields.interface";

/**
 * Classe que representa um erro de validação de entidade.
 * Extende a classe nativa Error.
 */
export class EntityValidationError extends Error {
  /**
   * Cria uma instância de EntityValidationError.
   *
   * @param {FieldsErrors[]} errors - Lista de erros de validação dos campos.
   * @param {string} [message="Entidade inválida"] - Mensagem de erro.
   */
  constructor(
    public errors: FieldsErrors[],
    message = "Entidade inválida",
  ) {
    super(message);
    this.name = "EntityValidationError";
  }

  /**
   * Retorna o número de erros presentes.
   *
   * @returns {number} Quantidade de erros.
   */
  countErrors(): number {
    return Object.keys(this.errors).length;
  }
}
