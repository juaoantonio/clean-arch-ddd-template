import { INotification, ToJsonOutput } from "./notification.interface";

export class Notification implements INotification {
  errors = new Map<string, string[] | string>();

  addError(error: string, field?: string): void {
    if (!field)
      this.errors.set(error, error); // error without field. example: 'Invalid email': 'Invalid email'
    else {
      // error with field. example: 'email': ['Invalid email', 'Email already exists']
      const errors = (this.errors.get(field) ?? []) as string[];
      const errorNotExists = errors.indexOf(error) === -1;
      if (errorNotExists) errors.push(error);
      this.errors.set(field, errors);
    }
  }

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

  copyErrors(notification: Notification): void {
    notification.errors.forEach((value, field) => this.setError(value, field));
  }

  hasErrors(): boolean {
    return this.errors.size > 0;
  }

  toJSON(): any {
    const errors: ToJsonOutput = [];

    for (const [field, error] of this.errors.entries()) {
      if (typeof error === "string") errors.push(error);
      else errors.push({ [field]: error });
    }
    return errors;
  }
}
