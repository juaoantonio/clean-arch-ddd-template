import { INotification } from "./notification.interface";

/**
 * Type representing field errors.
 * Can be an object with a field and error messages or a simple string.
 */
export type FieldsErrors =
  | {
      [field: string]: string[];
    }
  | string;

/**
 * Interface that defines a field validator.
 */
export interface IValidatorFields {
  /**
   * Performs validation on the provided data and adds errors to the given notification.
   *
   * @param {INotification} notification - Instance to record errors.
   * @param {any} data - Data to be validated.
   * @param {string[]} [fields] - Optional list of fields to be validated.
   */
  validate(notification: INotification, data: any, fields?: string[]): void;
}
