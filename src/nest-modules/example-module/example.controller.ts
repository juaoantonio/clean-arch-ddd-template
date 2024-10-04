import { Body, Controller, Inject, Post } from "@nestjs/common";
import { CreateExampleUseCase } from "@core/example/application/create-example.use-case";
import { CreateExampleDto } from "./dto/create-example.dto";

@Controller("example")
export class ExampleController {
  @Inject(CreateExampleUseCase)
  private createExampleUseCase: CreateExampleUseCase;

  @Post()
  async createExample(@Body() createExampleDto: CreateExampleDto) {
    await this.createExampleUseCase.execute(createExampleDto);
  }
}
