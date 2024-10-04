/**
 * Interface for validation error notifications.
 */
export interface INotification {
  /**
   * Map that stores errors, where the key is the field or error message,
   * and the value is the message or an array of error messages.
   */
  errors: Map<string, string | string[]>;

  /**
   * Adds an error to the notification.
   *
   * @param {string} error - The error message.
   * @param {string} [field] - The field associated with the error.
   */
  addError(error: string, field?: string): void;

  /**
   * Sets an error or list of errors for a specific field.
   *
   * @param {string | string[]} error - The error message(s).
   * @param {string} [field] - The field associated with the errors.
   */
  setError(error: string | string[], field?: string): void;

  /**
   * Checks if there are any errors in the notification.
   *
   * @returns {boolean} True if there are errors, false otherwise.
   */
  hasErrors(): boolean;

  /**
   * Copies errors from another notification.
   *
   * @param {INotification} notifications - The notification from which errors will be copied.
   */
  copyErrors(notifications: INotification): void;

  /**
   * Converts errors to a JSON format.
   *
   * @returns {ToJsonOutput} An array containing the error messages.
   */
  toJSON(): ToJsonOutput;
}

/**
 * Type defining the output format for the toJSON method.
 */
export type ToJsonOutput = Array<string | Record<string, string[]>>;
