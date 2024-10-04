/*
@class InvalidArgumentError
@description Erro de domínio lançado quando um argumento inválido é passado para um método.
 */
export class InvalidArgumentError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "InvalidArgumentError";
  }
}
