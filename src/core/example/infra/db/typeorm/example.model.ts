import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity({
  name: "example",
})
export class ExampleModel {
  @PrimaryColumn({
    type: "uuid",
  })
  id: string;

  @Column({
    type: "varchar",
  })
  name: string;

  @Column({
    type: "int",
  })
  age: number;

  constructor(id: string, name: string, age: number) {
    this.id = id;
    this.name = name;
    this.age = age;
  }
}
