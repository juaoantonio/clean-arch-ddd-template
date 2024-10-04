import { ValueObject } from "./value-object";

/**
 * Classe abstrata que representa um Identificador único para entidades.
 * Extende a classe ValueObject e fornece um método para obter o valor do identificador.
 */
export abstract class Identifier extends ValueObject {
  /**
   * Método abstrato que deve ser implementado para retornar o valor do identificador.
   *
   * @returns {string} Valor do identificador.
   */
  public abstract getValue(): string;

  /**
   * Retorna a representação em string do identificador.
   *
   * @returns {string} Valor do identificador como string.
   */
  public toString(): string {
    return this.getValue();
  }
}
