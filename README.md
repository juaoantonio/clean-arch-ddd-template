# Clean Architecture and Domain-Driven Design (DDD) Template with NestJS

## Index

1. [Introduction](#introduction)
2. [Technologies and Concepts Used](#technologies-and-concepts-used)
3. [Project Architecture](#project-architecture)
    - [Overview](#overview)
    - [Architecture Layers](#architecture-layers)
    - [Data Flow](#data-flow)
    - [Folder Organization](#folder-organization)
4. [Domain-Driven Design (DDD)](#domain-driven-design-ddd)
    - [Strategic Modeling](#strategic-modeling)
    - [Tactical Modeling](#tactical-modeling)
        - [Entities](#entities)
        - [Value Objects](#value-objects)
        - [Aggregates](#aggregates)
        - [Repositories](#repositories)
5. [Aggregate Root Implementation Example](#aggregate-root-implementation-example)
    - [Overview](#overview-1)
    - [Detailed Implementation](#detailed-implementation)
        - [Imports and Dependencies](#imports-and-dependencies)
        - [Aggregate Root Identifier](#aggregate-root-identifier)
        - [ExampleAggregateRoot Class](#exampleaggregateroot-class)
            - [Create Method](#create-method)
            - [Validate Method](#validate-method)
            - [Getter Methods](#getter-methods)
            - [Modification Methods](#modification-methods)
        - [Validator Implementation](#validator-implementation)
            - [ExampleRules Class](#examplerules-class)
            - [ExampleValidator Class](#examplevalidator-class)
            - [ExampleValidatorFactory Class](#examplevalidatorfactory-class)
    - [Final Considerations](#final-considerations)
    - [Benefits of the Approach](#benefits-of-the-approach)
    - [Recommendations for New Developers](#recommendations-for-new-developers)
6. [Setup and Installation](#setup-and-installation)
7. [Testing](#testing)
8. [Appendix](#appendix)
    - [Useful Links and References](#useful-links-and-references)

---

## Introduction

This **Clean Architecture and Domain-Driven Design (DDD) with NestJS** template provides a solid foundation for building efficient and scalable backend applications. It includes core features, design patterns, and an architectural structure that facilitates maintenance, evolution, and team collaboration, all aligned with software development best practices.

## Technologies and Concepts Used

- **NestJS**: A Node.js framework for building efficient, scalable server-side applications.
- **Clean Architecture**: An architectural pattern that promotes separation of concerns and facilitates software maintenance and evolution.
- **Domain-Driven Design (DDD)**: A development approach that focuses on the business domain and its logic.

## Project Architecture

### Overview

The project architecture follows Clean Architecture principles, where dependencies flow inward, and inner layers are unaware of outer layers. This ensures the domain remains independent of frameworks and external technologies.

![Clean Architecture](assets/clean-arch.png)

### Architecture Layers

1. **Presentation Layer (User Interface)**
    - Responsible for handling input and output interfaces.
    - Implemented using NestJS controllers and presenters.

2. **Application Layer**
    - Contains the application's use cases.
    - Orchestrates interactions between the presentation and domain layers.

3. **Domain Layer**
    - The core of the application, containing business logic.
    - Implements DDD through entities, value objects, and aggregates.

4. **Infrastructure Layer**
    - Provides concrete implementations for interfaces defined in higher layers.
    - Handles details like data persistence, external services, etc.

### Data Flow

1. **Request arrives at the Controller** in the presentation layer.
2. **The Controller invokes the appropriate Use Case** in the application layer.
3. **The Use Case interacts with the Domain**, manipulating entities and applying business rules.
4. **Repositories are used** to persist or retrieve data.
5. **Response is sent back** through the controller.

### Folder Organization

The project's folder structure follows this pattern:

```plaintext
src/                    # Project root directory
|-- main.ts             # Application entry point
|-- app.module.ts       # Main application module
|-- core/               # Divides the architecture layers by modules, representing aggregates
|   |-- @shared/        # Module containing shared resources across different modules
|      |-- application/ # Generic application resources used across modules
|      |-- domain/      # Definitions of entities, value objects, aggregates, etc.
|      |-- infrastructure/ # Definitions of interfaces and abstractions for repositories, external services, etc.
|   |-- example/        # Example core module, containing application, domain, and infrastructure layers
|-- nest-modules/       # NestJS modules
|   |-- config-module/  # Application configuration module
|   |-- database-module/ # Database connection module
|   |-- shared-module/  # Shared module with generic resources
|   |-- example-module/ # Example module, integrating Nest resources with core resources (repositories, use cases)
```

---

## Domain-Driven Design (DDD)

### Strategic Modeling

Domain-Driven Design is more than just implementing patterns like Repository or Service. It’s a development approach that aims to align code with the business domain, making it more readable and maintainable.

When creating a feature, focus on how the business domain behaves and how to represent it in the code. Use DDD concepts like **Bounded Contexts** and **Ubiquitous Language** to guide your development.

For this template, the **Event Storming** methodology can be employed, mapping the key system events and their interactions. Adapt as needed based on the specific project requirements.

### Tactical Modeling

In DDD, we use a series of patterns to implement domain concepts in code:

#### Entities

- Represent objects with a unique identity in the domain.
- Example: User, Product, Order.

#### Value Objects

- Immutable objects defined by their attributes.
- Example: Date, Email.

#### Aggregates

- A group of entities and value objects treated as a single unit.
- They have a root that controls consistency.

#### Repositories

- Interfaces that abstract aggregate persistence.
- Defined in the domain layer and implemented in the infrastructure layer.

---

## Aggregate Root Implementation Example

### Overview

This section aims to help new developers understand the implementation of an **Aggregate Root** in the context of Domain-Driven Design (DDD) using TypeScript and design patterns. The `ExampleAggregateRoot` class will serve as a foundation for building other aggregates in the template.

In DDD, an **Aggregate Root** is the primary entity that groups related objects, ensuring data consistency and integrity within the domain. The following implementation uses:

- **Value Objects**: Immutable objects that represent domain values.
- **Entities**: Objects with unique identities and their own life cycles.
- **Validators**: Classes responsible for validating the entity’s business rules.
- **Factory Methods**: Static methods that encapsulate object creation logic.

---

### Detailed Implementation

#### Imports and Dependencies

```typescript
import { Uuid } from "../../@shared/domain/value-objects/uuid.vo";
import { AggregateRoot } from "../../@shared/domain/aggregate-root";
import { ExampleValidatorFactory } from "@core/example/domain/example.validator";
```

- **Uuid**: A Value Object representing a universally unique identifier (UUID).
- **AggregateRoot**: A base class providing common functionality for aggregates.
- **ExampleValidatorFactory**: A factory that creates validator instances for the entity.

#### Aggregate Root Identifier

```typescript
export class ExampleAggregateRootId extends Uuid {}
```

- **ExampleAggregateRootId**: A class extending `Uuid` to type the aggregate’s identifier.
- **Motivation**: Typing the aggregate's ID improves code safety and clarity, preventing incorrect ID assignments.

#### ExampleAggregateRoot Class

```typescript
export class ExampleAggregateRoot extends AggregateRoot<ExampleAggregateRootId> {
  constructor(
    id: ExampleAggregateRootId,
    private name: string,
    private age: number,
  ) {
    super(id);
    this.name = name;
  }

  // ...
}
```

- **AggregateRoot Extension**: The class extends `AggregateRoot` and types the ID with `ExampleAggregateRootId`.
- **Private Properties**: `name` and `age` are private properties of the entity.
- **Constructor**: Initializes the aggregate with an ID, name, and age. Note that `validate()` is not called here, as it serves the purpose of transforming existing data into a domain object.

##### Create Method

```typescript
public static create(name: string, age: number): ExampleAggregateRoot {
  const id = ExampleAggregateRootId.random();
  const aggregate = new ExampleAggregateRoot(id, name, age);
  aggregate.validate();
  return aggregate;
}
```

- **Factory Method Pattern**: A static method that creates and validates a new instance of the aggregate.
- **ID Generation**: Uses `ExampleAggregateRootId.random()` to create a unique ID.
- **Validation**: Calls `aggregate.validate()` to ensure the entity is consistent before use.
- **Motivation**: Centralizes creation logic and ensures all instances are validated immediately upon creation.

##### Validate Method

```typescript
validate(fields?: string[]): void {
  const validator = ExampleValidatorFactory.create();
  validator.validate(this.notification, this, fields);
}
```

- **Business Rule Validation**: Uses a validator to check if the entity meets defined rules.
- **No Exception Throwing in Domain Layer**: Validation errors are recorded in an `INotification` instance, leaving the application layer responsible for handling them.
- **Fields Parameter**: Allows validating specific fields, useful for partial updates.
- **Motivation**: Keeps the entity in a valid state, following the consistency principle in DDD.

##### Getter Methods



```typescript
public getName(): string {
  return this.name;
}

public getAge(): number {
  return this.age;
}
```

- **Encapsulation**: Provides controlled access to private properties.
- **Motivation**: Protects data integrity and offers a clear interface for interacting with the entity.

##### Modification Methods

```typescript
public changeName(name: string): void {
  this.name = name;
}

public changeAge(age: number): void {
  this.age = age;
  this.validate(["age"]);
}
```

- **changeName**: Updates the name without additional validation.
- **changeAge**: Updates the age and validates the `age` field.
- **Motivation**:
    - **changeName**: Assumes any name is valid in this context.
    - **changeAge**: Age has business rules (e.g., must be an adult), so validation is necessary after the change.

---

#### Validator Implementation

##### Imports and Dependencies

```typescript
import { ExampleAggregateRoot } from "@core/example/domain/example.aggregate";
import { ClassValidatorFields } from "@core/@shared/domain/validators/class-validator-fields";
import { INotification } from "@core/@shared/domain/validators/notification.interface";
import { IsPositive, Min } from "class-validator";
```

- **ClassValidatorFields**: A base class that integrates `class-validator` for validations.
- **INotification**: An interface for error notification.
- **class-validator Decorators**: `IsPositive` and `Min` are used to define validation rules.

##### ExampleRules Class

```typescript
class ExampleRules {
  @Min(18, { message: "Must be at least 18 years old", groups: ["age"] })
  @IsPositive({ message: "Age must be a positive number", groups: ["age"] })
  age: number;

  constructor(aggregate: ExampleAggregateRoot) {
    Object.assign(this, aggregate);
  }
}
```

- **Rule Definition**: Uses decorators to specify validation rules for the `age` field.
    - **@Min(18)**: Minimum age of 18.
    - **@IsPositive()**: Age must be a positive number.
- **Validation Groups**: The `groups: ["age"]` parameter allows field-specific validation.
- **Constructor**: Assigns aggregate properties to the rules, enabling the validator to access current values.
- **Motivation**: Separates validation rules from the entity to keep the code organized and maintainable.

##### ExampleValidator Class

```typescript
export class ExampleValidator extends ClassValidatorFields {
  validate(
    notification: INotification,
    data: ExampleAggregateRoot,
    fields?: string[],
  ): void {
    const newFields = fields?.length ? fields : Object.keys(data);

    return super.validate(notification, new ExampleRules(data), newFields);
  }
}
```

- **ClassValidatorFields Extension**: Inherits validation methods that integrate `class-validator`.
- **Validate Method**:
    - **Parameters**:
        - **notification**: Instance for recording validation errors.
        - **data**: Instance of the aggregate to be validated.
        - **fields**: Specific fields to validate.
    - **Logic**:
        - Determines which fields to validate.
        - Creates an instance of `ExampleRules` with current data.
        - Calls the base class's validation method.
- **Motivation**: Customizes the validation process for the aggregate, enabling partial validation and rule reuse.

##### ExampleValidatorFactory Class

```typescript
export class ExampleValidatorFactory {
  static create() {
    return new ExampleValidator();
  }
}
```

- **Factory Pattern**: Provides a static method to create validator instances.
- **Motivation**: Facilitates future replacement or extension of the validator, keeping the code decoupled.

---

### Final Considerations

By using this implementation as a foundation, other aggregates in the template can:

- **Extend the AggregateRoot Class**: Ensuring common functionalities (e.g., domain event handling) are inherited.
- **Define Specific Identifiers**: Create ID classes that extend `Uuid` for improved clarity and safety.
- **Implement Validation Rules**: Use the presented pattern to separate business rules from entities, keeping the code organized.
- **Use Factory Methods**: Centralize creation and validation logic for entities.

---

### Benefits of the Approach

- **Consistency**: The project's code maintains a consistent structure, making it easier to understand and maintain.
- **Flexibility**: Separation of concerns allows business rule or validation changes to be made without affecting other parts of the system.
- **Reusability**: Components like validators and value objects can be reused across different parts of the project.
- **Scalability**: The architecture allows the system to grow in an organized manner, adding new aggregates and features without compromising code integrity.

---

### Recommendations for New Developers

- **Familiarize Yourself with DDD Concepts**: Understand the principles of **Aggregate Roots**, **Entities**, **Value Objects**, and **Domain Events**.
- **Study the Provided Implementation**: Analyze the code and documentation to grasp how the patterns are applied.
- **Follow the Established Patterns**: When creating new aggregates, use this implementation as a reference to maintain consistency.
- **Contribute Improvements**: If you identify opportunities to improve the implementation, share with the team to enhance the template.

---

## Setup and Installation

1. **Prerequisites**
    - Node.js version 20.14.0 or higher
    - PNPM version 9.2.0 or higher

2. **Installation Steps**

```bash
   # Clone the repository
   git clone https://github.com/your-username/your-template.git

   # Enter the project directory
   cd your-template

   # Install dependencies
   pnpm i
```

3. **Environment Setup**
    - Rename the `env.development.example` file to `.env` or `.env.development`, and you'll have a ready-to-use development environment.

4. **Running the Application**

```bash
   # Development mode
   pnpm run start:dev

   # Production mode
   pnpm run start:prod
```

## Testing

- **Unit Tests**
    - Files ending in `.spec.ts` in the `./src` folder are considered unit tests.
    - Run with `pnpm run test` or `pnpm run test:watch`.

- **Integration Tests**
    - Files ending in `.e2e-spec.ts` in the `./test` folder are considered integration tests.
    - Run with `pnpm run test:e2e`.

- **Test Coverage**
    - Generate a coverage report with `pnpm run test:cov`.

---

## Appendix

### Useful Links and References

- [NestJS Documentation](https://docs.nestjs.com/)
- [Clean Architecture by Robert C. Martin](https://a.co/d/2cZuWkJ)
- [Domain-Driven Design by Eric Evans](https://a.co/d/aDh1fqc)
- [Implementing Domain-Driven Design by Vaughn Vernon](https://a.co/d/9KD490q)
- [Event Storming by Alberto Brandolini](https://www.eventstorming.com/)

#### FullCycle

For those with access to FullCycle, here are some courses that can help understand the concepts discussed:

- [Domain-Driven Design - Strategic Design](https://plataforma.fullcycle.com.br/courses/3b8c4f2c-aff9-4399-a72a-ad879e5689a2/340/168/129/conteudos)
- [Domain-Driven Design - Tactical Design](https://plataforma.fullcycle.com.br/courses/3b8c4f2c-aff9-4399-a72a-ad879e5689a2/340/168/167/conteudos)
- [EventStorming in Practice](https://plataforma.fullcycle.com.br/courses/3b8c4f2c-aff9-4399-a72a-ad879e5689a2/340/168/168/conteudos)
- [Clean Architecture - Overview](https://plataforma.fullcycle.com.br/courses/3b8c4f2c-aff9-4399-a72a-ad879e5689a2/340/168/138/conteudos)
- [Practical Project - Clean Architecture](https://plataforma.fullcycle.com.br/courses/3b8c4f2c-aff9-4399-a72a-ad879e5689a2/340/168/196/conteudos)

---

**Note:** This documentation has been expanded to include specific details on the implementation of an Aggregate Root, code examples, and in-depth explanations of architectural and design decisions. This template is expected to help developers quickly integrate with established patterns and facilitate the creation of scalable applications.