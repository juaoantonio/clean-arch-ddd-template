import { ValueObject } from "../value-object";

/**
 * Classe que representa um Objeto de Valor para datas.
 * Fornece métodos utilitários para manipulação e comparação de datas.
 */
export class DateVo extends ValueObject {
  /**
   * Instância interna de Date.
   */
  private readonly date: Date;

  /**
   * Construtor da classe DateVo.
   *
   * @param {Date} date - Instância de Date a ser encapsulada.
   */
  constructor(date: Date) {
    super();
    this.date = date;
  }

  /**
   * Cria uma nova instância de DateVo a partir de uma data ou string.
   *
   * @param {Date | string} date - Data ou string representando a data.
   * @returns {DateVo} Nova instância de DateVo.
   */
  static create(date: Date | string): DateVo {
    return new DateVo(new Date(date));
  }

  /**
   * Cria uma nova instância de DateVo com a data atual.
   *
   * @returns {DateVo} Nova instância de DateVo com a data atual.
   */
  static now(): DateVo {
    return new DateVo(new Date());
  }

  /**
   * Obtém a instância de Date encapsulada.
   *
   * @returns {Date} Instância de Date.
   */
  public getDate(): Date {
    return this.date;
  }

  /**
   * Obtém a data formatada no padrão ISO (YYYY-MM-DD).
   *
   * @returns {string} Data formatada.
   */
  public getDateFormatted(): string {
    return this.date.toISOString().split("T")[0];
  }

  /**
   * Verifica se a data representada é a data atual.
   *
   * @returns {boolean} True se for hoje, false caso contrário.
   */
  public isToday(): boolean {
    const today = new Date();
    return (
      this.date.getDate() === today.getDate() &&
      this.date.getMonth() === today.getMonth() &&
      this.date.getFullYear() === today.getFullYear()
    );
  }

  /**
   * Verifica se a data representada está no passado.
   *
   * @returns {boolean} True se estiver no passado, false caso contrário.
   */
  public isInPast(): boolean {
    return this.date < new Date();
  }

  /**
   * Verifica se a data representada está no futuro.
   *
   * @returns {boolean} True se estiver no futuro, false caso contrário.
   */
  public isInFuture(): boolean {
    return this.date > new Date();
  }
}
