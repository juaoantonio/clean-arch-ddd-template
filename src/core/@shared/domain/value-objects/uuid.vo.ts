import { Identifier } from "../identifier";
import { v4 as uuidv4, validate as validateUuid } from "uuid";

/**
 * Classe que representa um Identificador Universal Único (UUID) como um Objeto de Valor.
 * Fornece métodos para criação e validação de UUIDs.
 */
export class Uuid extends Identifier {
  /**
   * Valor do UUID.
   */
  readonly value: string;

  /**
   * Construtor protegido para criar uma instância de Uuid.
   * Valida o UUID após a criação.
   *
   * @param {string} [value] - Valor do UUID. Se não fornecido, um novo UUID será gerado.
   */
  protected constructor(value?: string) {
    super();
    this.value = value || uuidv4();
    this.validate();
  }

  /**
   * Cria uma nova instância de Uuid com um valor especificado.
   *
   * @param {string} value - Valor do UUID a ser utilizado.
   * @returns {Uuid} Nova instância de Uuid.
   */
  public static create(value: string): Uuid {
    return new Uuid(value);
  }

  /**
   * Cria uma nova instância de Uuid com um valor gerado aleatoriamente.
   *
   * @returns {Uuid} Nova instância de Uuid.
   */
  public static random(): Uuid {
    return new Uuid();
  }

  /**
   * Obtém o valor do UUID.
   *
   * @returns {string} Valor do UUID.
   */
  public getValue(): string {
    return this.value;
  }

  /**
   * Valida o UUID para garantir que ele seja válido.
   * Lança um erro se o UUID for inválido.
   *
   * @private
   */
  private validate(): void {
    const isValidUuid = validateUuid(this.value);

    if (!isValidUuid || !this.value) {
      throw new Error("UUID inválido");
    }
  }
}
