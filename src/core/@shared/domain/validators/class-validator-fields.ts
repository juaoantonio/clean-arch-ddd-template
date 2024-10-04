import { IValidatorFields } from "./validator-fields.interface";
import { validateSync } from "class-validator";
import { INotification } from "./notification.interface";

/**
 * Abstract class that implements the field validation interface using class-validator.
 * Responsible for validating data objects and adding errors to the notification if any exist.
 */
export abstract class ClassValidatorFields implements IValidatorFields {
  /**
   * Performs validation on the provided data and adds any found errors to the notification.
   *
   * @param {INotification} notification - Instance of the notification to store errors.
   * @param {any} data - Data to be validated.
   * @param {string[]} [fields] - Specific fields to be validated.
   */
  validate(notification: INotification, data: any, fields?: string[]): void {
    const errors = validateSync(data, {
      groups: fields,
    });

    if (errors.length > 0) {
      for (const error of errors) {
        const field = error.property;
        Object.values(error.constraints).forEach((message) => {
          notification.addError(message, field);
        });
      }
    }
  }
}
