import { ValueObject } from "../value-object";
import { DateVo } from "./date.vo";

/**
 * Class representing a time period with start and end dates.
 * Provides methods for validation and manipulation of periods.
 */
export class Period extends ValueObject {
  /**
   * Start date of the period.
   */
  private readonly startDate: DateVo;

  /**
   * End date of the period.
   */
  private readonly endDate: DateVo;

  /**
   * Constructor for the Period class.
   *
   * @param {{ startDate: DateVo; endDate: DateVo }} props - Properties of the period.
   */
  constructor(props: { startDate: DateVo; endDate: DateVo }) {
    super();

    this.startDate = props.startDate;
    this.endDate = props.endDate;
  }

  /**
   * Creates a new instance of Period and validates the provided dates.
   *
   * @param {{ startDate: DateVo; endDate: DateVo }} props - Properties of the period.
   * @returns {Period} New instance of Period.
   */
  static create(props: { startDate: DateVo; endDate: DateVo }): Period {
    const period = new Period(props);
    period.validate();
    return period;
  }

  /**
   * Validates the period to ensure the dates are consistent.
   * Throws an error if the dates are invalid.
   */
  validate(): void {
    if (this.startDate.getDate() < new Date()) {
      throw new Error("The start date cannot be in the past");
    }

    if (this.endDate.getDate() < new Date()) {
      throw new Error("The end date cannot be in the past");
    }

    if (this.startDate.getDate() > this.endDate.getDate()) {
      throw new Error("The start date cannot be after the end date");
    }
  }

  /**
   * Gets the start date of the period.
   *
   * @returns {DateVo} Start date.
   */
  public getStartDate(): DateVo {
    return this.startDate;
  }

  /**
   * Gets the end date of the period.
   *
   * @returns {DateVo} End date.
   */
  public getEndDate(): DateVo {
    return this.endDate;
  }

  /**
   * Calculates the total number of days in the period.
   *
   * @returns {number} Total number of days.
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
   * Checks if a specific date is within the period.
   *
   * @param {DateVo} date - Date to be checked.
   * @returns {boolean} True if the date is within the period, false otherwise.
   */
  public contains(date: DateVo): boolean {
    return (
      date.getDate() >= this.startDate.getDate() &&
      date.getDate() <= this.endDate.getDate()
    );
  }
}
