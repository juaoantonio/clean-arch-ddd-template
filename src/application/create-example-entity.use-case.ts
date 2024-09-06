import { ExampleEntityRepository } from "@domain/example-entity/example-entity.repository";
import { ExampleEntity } from "@domain/example-entity/example-entity.aggregate";

export class CreateExampleEntityUseCase {
  constructor(private readonly exampleRepository: ExampleEntityRepository) {}

  async execute(input: Input): Promise<Output> {
    const example = ExampleEntity.create(input.name);
    const result = await this.exampleRepository.save(example);
    return {
      id: result,
    };
  }
}

interface Input {
  name: string;
}

interface Output {
  id: string;
}
