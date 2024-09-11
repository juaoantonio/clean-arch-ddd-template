export interface INotification {
  addError(error: string, field?: string): void;
  setError(error: string | string[], field?: string): void;
  hasErrors(): boolean;
  copyErrors(notifications: INotification): void;
  toJSON(): ToJsonOutput;
}

export type ToJsonOutput = Array<string | Record<string, string[]>>;
