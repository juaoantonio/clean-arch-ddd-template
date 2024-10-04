import isEqual from "lodash/isEqual";

/**
 * Classe abstrata que representa um Objeto de Valor (Value Object) no DDD.
 * Objetos de Valor são objetos imutáveis que são definidos por seus atributos.
 */
export abstract class ValueObject {
  /**
   * Verifica se o Objeto de Valor atual é igual a outro.
   *
   * @param {this} vo - Outro objeto de valor a ser comparado.
   * @returns {boolean} True se os objetos forem iguais, false caso contrário.
   */
  public equals(vo: this): boolean {
    if (vo === null || vo === undefined) {
      return false;
    }

    if (vo.constructor.name !== this.constructor.name) {
      return false;
    }

    return isEqual(this, vo);
  }
}
