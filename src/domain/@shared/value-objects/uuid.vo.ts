import { Identifier } from "@domain/@shared/identifier";
import { v4 as uuidv4, validate as validateUuid } from "uuid";

export class Uuid extends Identifier {
  readonly value: string;

  protected constructor(value?: string) {
    super();
    this.value = value || uuidv4();
    this.validate();
  }

  public static create(value: string): Uuid {
    return new Uuid(value);
  }

  public static random(): Uuid {
    return new Uuid();
  }

  public getValue(): string {
    return this.value;
  }

  private validate(): void {
    const isValidUuid = validateUuid(this.value);

    if (!isValidUuid || !this.value) {
      throw new Error("UUID inválido");
    }
  }
}
