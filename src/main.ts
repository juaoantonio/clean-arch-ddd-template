import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { NotFoundFilter } from "./nest-modules/shared-module/filters/not-found/not-found.filter";
import { EntityValidationErrorFilter } from "./nest-modules/shared-module/filters/entity-validation-error/entity-validation-error.filter";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new NotFoundFilter(), new EntityValidationErrorFilter());
  app.useGlobalPipes(
    new ValidationPipe({
      errorHttpStatusCode: 422,
    }),
  );
  const config = new DocumentBuilder()
    .setTitle("Agile Backend API")
    .setDescription("API para o projeto Agile Backend")
    .setVersion("1.0")
    .addTag("agile")
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("swagger", app, document);
  await app.listen(3000);
}
bootstrap();
