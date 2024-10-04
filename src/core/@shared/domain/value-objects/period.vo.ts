import { ValueObject } from "../value-object";
import { DateVo } from "./date.vo";

/**
 * Classe que representa um período de tempo com data de início e fim.
 * Fornece métodos para validação e manipulação de períodos.
 */
export class Period extends ValueObject {
  /**
   * Data de início do período.
   */
  private readonly startDate: DateVo;

  /**
   * Data de fim do período.
   */
  private readonly endDate: DateVo;

  /**
   * Construtor da classe Period.
   *
   * @param {{ startDate: DateVo; endDate: DateVo }} props - Propriedades do período.
   */
  constructor(props: { startDate: DateVo; endDate: DateVo }) {
    super();

    this.startDate = props.startDate;
    this.endDate = props.endDate;
  }

  /**
   * Cria uma nova instância de Period e valida as datas fornecidas.
   *
   * @param {{ startDate: DateVo; endDate: DateVo }} props - Propriedades do período.
   * @returns {Period} Nova instância de Period.
   */
  static create(props: { startDate: DateVo; endDate: DateVo }): Period {
    const period = new Period(props);
    period.validate();
    return period;
  }

  /**
   * Valida o período para garantir que as datas sejam consistentes.
   * Lança um erro se as datas forem inválidas.
   */
  validate(): void {
    if (this.startDate.getDate() < new Date()) {
      throw new Error("A data de início não pode estar no passado");
    }

    if (this.endDate.getDate() < new Date()) {
      throw new Error("A data de fim não pode estar no passado");
    }

    if (this.startDate.getDate() > this.endDate.getDate()) {
      throw new Error("A data de início não pode ser posterior à data de fim");
    }
  }

  /**
   * Obtém a data de início do período.
   *
   * @returns {DateVo} Data de início.
   */
  public getStartDate(): DateVo {
    return this.startDate;
  }

  /**
   * Obtém a data de fim do período.
   *
   * @returns {DateVo} Data de fim.
   */
  public getEndDate(): DateVo {
    return this.endDate;
  }

  /**
   * Calcula o total de dias no período.
   *
   * @returns {number} Número total de dias.
   */
  public getTotalDays(): number {
    const diffTime = Math.abs(
      this.endDate.getDate().getTime() - this.startDate.getDate().getTime(),
    );
    const milisecondsInADay = 1000 * 60 * 60 * 24;
    const diffDays = Math.ceil(diffTime / milisecondsInADay);
    return diffDays + 1;
  }

  /**
   * Verifica se uma data específica está dentro do período.
   *
   * @param {DateVo} date - Data a ser verificada.
   * @returns {boolean} True se a data estiver dentro do período, false caso contrário.
   */
  public contains(date: DateVo): boolean {
    return (
      date.getDate() >= this.startDate.getDate() &&
      date.getDate() <= this.endDate.getDate()
    );
  }
}
