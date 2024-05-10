import { Client } from "pg";
import { config } from "../config/config";

export const getConnection = async () => {
  const client = await new Client({
    host: 'localhost',
    port: +config.dbPort!,
    user: config.dbUser,
    password: config.dbPassword,
    database: config.dbName
  });

  await client.connect()
  return client
}
