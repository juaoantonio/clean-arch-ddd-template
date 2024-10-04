import { IExampleRepository } from "@core/example/domain/example.repository";
import { ExampleAggregateRoot } from "@core/example/domain/example.aggregate";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { IUseCase } from "@core/@shared/application/use-case.interface";
import { EntityValidationError } from "@core/@shared/domain/validators/validation.error";

export class CreateExampleUseCase
  implements IUseCase<CreateExampleInput, Promise<void>>
{
  constructor(private readonly exampleRepository: IExampleRepository) {}

  async execute(input: CreateExampleInput): Promise<void> {
    const example = ExampleAggregateRoot.create(input.name, input.age);
    if (example.notification.hasErrors()) {
      throw new EntityValidationError(example.notification.toJSON());
    }
    await this.exampleRepository.save(example);
  }
}

export class CreateExampleInput {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  age: number;

  constructor(props: { name: string; age: number }) {
    if (!props) return;
    this.name = props.name;
    this.age = props.age;
  }
}
