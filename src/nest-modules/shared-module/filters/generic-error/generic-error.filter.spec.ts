import { Controller, Get, INestApplication } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import request from "supertest";
import { GenericErrorFilter } from "./generic-error.filter";

@Controller("stub")
class StubController {
  @Get()
  index() {
    throw new Error("Generic error");
  }
}

describe("GenericErrorFilter", () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [StubController],
    }).compile();
    app = moduleFixture.createNestApplication();
    app.useGlobalFilters(new GenericErrorFilter());
    await app.init();
  });

  it("should catch a EntityValidationError", () => {
    return request(app.getHttpServer()).get("/stub").expect(500).expect({
      statusCode: 500,
      error: "Internal Server Error",
      message: "Erro desconhecido, entre em contato com o suporte",
    });
  });
});
