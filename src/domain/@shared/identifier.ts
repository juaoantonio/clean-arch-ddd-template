import { ValueObject } from "@domain/@shared/value-object";

export abstract class Identifier extends ValueObject {
  public abstract getValue(): string;
}
