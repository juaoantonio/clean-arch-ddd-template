import { MySqlContainer, StartedMySqlContainer } from "@testcontainers/mysql";
import { afterAll, beforeAll, expect, it } from "vitest";
import { Connection, createConnection } from "mysql2/promise";

let container: StartedMySqlContainer;
let mysqlClient: Connection;

beforeAll(async () => {
  container = await new MySqlContainer().start();
  mysqlClient = await createConnection({
    host: container.getHost(),
    port: container.getPort(),
    database: container.getDatabase(),
    user: container.getUsername(),
    password: container.getUserPassword(),
  });
  await mysqlClient.connect();
});

afterAll(async () => {
  await mysqlClient.end();
  await container.stop();
});

it("should connect and execute query", async () => {
  const [rows] = await mysqlClient.query("SELECT 1 + 1 AS solution");
  expect(rows[0].solution).toBe(2);
});
