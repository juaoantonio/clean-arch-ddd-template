/*
This interface is responsible for defining the contract of a use case.
@template Input - Type of the use case input.
@template Output - Type of the use case output.
*/
export interface IUseCase<Input, Output> {
  execute(input: Input): Output;
}
