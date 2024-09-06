# Clean Architecture with Tactical DDD Patterns in Node.js/TypeScript

This repository demonstrates a **Clean Architecture** implementation using **Node.js** and **TypeScript**, with a focus on **Tactical DDD** (Domain-Driven Design) patterns in the Entity Layer. The project follows a scalable and maintainable architecture, separating concerns across different layers while applying the core principles of DDD.

## Key Features

- **NestJS Framework (Infrastructure Layer)**: Implements the infrastructure layer using NestJS, providing out-of-the-box support for modularity, testability, and a strong developer experience. However, the architecture is flexible enough to be adapted to other frameworks or technologies.
  
- **Tactical DDD Patterns**: The domain layer applies tactical DDD concepts such as Aggregates, Value Objects, Repositories, and Entities, ensuring a clear separation between business logic and infrastructure.

- **Testing**: Uses **Vitest** for unit and integration testing, providing fast and efficient test execution with an emphasis on maintaining code quality.

- **Extensibility**: The architecture is designed to be framework-agnostic, allowing you to swap out technologies in the infrastructure layer while keeping the domain logic intact.

## Layers Overview

1. **Domain Layer**: Contains core business logic, utilizing tactical DDD patterns such as:
   - **Entities**
   - **Value Objects**
   - **Aggregates**
   - **Repositories**
  
2. **Application Layer**: Coordinates user requests and orchestrates use cases without containing business logic. Uses **NestJS** services and DTOs for request handling.

3. **Infrastructure Layer**: Implements NestJS modules, controllers, and repositories for interacting with the database, third-party services, or external APIs.

## Get Started

Clone the repository and follow the instructions to install dependencies and run tests.

```bash
git clone https://github.com/juaoantonio/nestjs-ddd-template.git
cd nestjs-ddd-template
pnpm install
pnpm run test
```
