/*
Essa interface é responsável por definir o contrato de um caso de uso.
@template Input - Tipo do input do caso de uso.
@template Output - Tipo do output do caso de uso.
*/
export interface IUseCase<Input, Output> {
  execute(input: Input): Output;
}
