import { INotification, ToJsonOutput } from "./notification.interface";

/**
 * Implementation of the INotification interface for managing error notifications.
 */
export class NotificationImplementation implements INotification {
  /**
   * Map that stores errors, where the key is the field or error message,
   * and the value is the message or list of error messages.
   */
  errors = new Map<string, string[] | string>();

  /**
   * Adds an error to the notification.
   *
   * @param {string} error - The error message.
   * @param {string} [field] - The field associated with the error.
   */
  addError(error: string, field?: string): void {
    if (!field)
      this.errors.set(error, error); // error without an associated field
    else {
      const errors = (this.errors.get(field) ?? []) as string[];
      const errorNotExists = errors.indexOf(error) === -1;
      if (errorNotExists) errors.push(error);
      this.errors.set(field, errors);
    }
  }

  /**
   * Sets an error or list of errors for a specific field.
   *
   * @param {string | string[]} error - The error message(s).
   * @param {string} [field] - The field associated with the errors.
   */
  setError(error: string | string[], field?: string): void {
    const isArrayOfErrors = Array.isArray(error);

    if (field) {
      this.errors.set(field, isArrayOfErrors ? error : [error]);
      return;
    }

    if (isArrayOfErrors) {
      error.forEach((err) => this.errors.set(err, err));
      return;
    }

    this.errors.set(error, error);
  }

  /**
   * Copies errors from another instance of NotificationImplementation.
   *
   * @param {NotificationImplementation} notification - Instance from which the errors will be copied.
   */
  copyErrors(notification: NotificationImplementation): void {
    notification.errors.forEach((value, field) => this.setError(value, field));
  }

  /**
   * Checks if there are any errors in the notification.
   *
   * @returns {boolean} True if there are errors, false otherwise.
   */
  hasErrors(): boolean {
    return this.errors.size > 0;
  }

  /**
   * Converts the stored errors to a JSON format.
   *
   * @returns {any} An array containing the error messages.
   */
  toJSON(): any {
    const errors: ToJsonOutput = [];

    for (const [field, error] of this.errors.entries()) {
      if (typeof error === "string") errors.push(error);
      else errors.push({ [field]: error });
    }
    return errors;
  }
}
