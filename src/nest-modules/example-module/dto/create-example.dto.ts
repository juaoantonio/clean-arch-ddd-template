import { CreateExampleInput } from "@core/example/application/create-example.use-case";
import { ApiProperty } from "@nestjs/swagger";

// Faço isso para que meu Input da camada de aplicação não se misture com o
// Swagger, já que este está na camada de apresentação.
export class CreateExampleDto extends CreateExampleInput {
  @ApiProperty({
    description: "Nome do exemplo",
    example: "João",
  })
  declare name: string;

  @ApiProperty({
    description: "Idade do exemplo",
    example: 25,
    minimum: 18,
  })
  declare age: number;

  constructor(props: CreateExampleInput) {
    super(props);
  }
}
