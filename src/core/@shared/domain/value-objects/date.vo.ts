import { ValueObject } from "../value-object";

/**
 * Class representing a Value Object for dates.
 * Provides utility methods for date manipulation and comparison.
 */
export class DateVo extends ValueObject {
  /**
   * Internal Date instance.
   */
  private readonly date: Date;

  /**
   * Constructor for the DateVo class.
   *
   * @param {Date} date - The Date instance to be encapsulated.
   */
  constructor(date: Date) {
    super();
    this.date = date;
  }

  /**
   * Creates a new DateVo instance from a date or string.
   *
   * @param {Date | string} date - Date or string representing the date.
   * @returns {DateVo} New instance of DateVo.
   */
  static create(date: Date | string): DateVo {
    return new DateVo(new Date(date));
  }

  /**
   * Creates a new DateVo instance with the current date.
   *
   * @returns {DateVo} New instance of DateVo with the current date.
   */
  static now(): DateVo {
    return new DateVo(new Date());
  }

  /**
   * Gets the encapsulated Date instance.
   *
   * @returns {Date} Date instance.
   */
  public getDate(): Date {
    return this.date;
  }

  /**
   * Gets the date formatted in ISO standard (YYYY-MM-DD).
   *
   * @returns {string} Formatted date.
   */
  public getDateFormatted(): string {
    return this.date.toISOString().split("T")[0];
  }

  /**
   * Checks if the represented date is today's date.
   *
   * @returns {boolean} True if it's today, false otherwise.
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
   * Checks if the represented date is in the past.
   *
   * @returns {boolean} True if it's in the past, false otherwise.
   */
  public isInPast(): boolean {
    return this.date < new Date();
  }

  /**
   * Checks if the represented date is in the future.
   *
   * @returns {boolean} True if it's in the future, false otherwise.
   */
  public isInFuture(): boolean {
    return this.date > new Date();
  }
}
