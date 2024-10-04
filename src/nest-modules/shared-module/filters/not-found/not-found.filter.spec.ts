import { Uuid } from "@core/@shared/domain/value-objects/uuid.vo";
import { Controller, Get, INestApplication } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { EntityNotFoundError } from "@core/@shared/domain/error/entity-not-found.error";
import { NotFoundFilter } from "./not-found.filter";
import request from "supertest";
import { AggregateRoot } from "@core/@shared/domain/aggregate-root";

class StubAggregate extends AggregateRoot<Uuid> {
  entity_id: any;
  toJSON(): Required<any> {
    return {};
  }
}

@Controller("stub")
class StubController {
  @Get()
  index() {
    throw new EntityNotFoundError("fake id", StubAggregate);
  }
}

describe("NotFoundErrorFilter Unit Tests", () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [StubController],
    }).compile();
    app = moduleFixture.createNestApplication();
    app.useGlobalFilters(new NotFoundFilter());
    await app.init();
  });

  it("should catch a EntityValidationError", () => {
    return request(app.getHttpServer()).get("/stub").expect(404).expect({
      statusCode: 404,
      error: "Not Found",
      message: "StubAggregate with id(s) fake id not found",
    });
  });
});
