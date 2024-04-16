import { Client } from "pg";

export const getConnection = async () => {
  const client = await new Client({
    host: 'localhost',
    port: 5432,
    user: 'juan',
    password: 'admin12345',
    database: 'my_store'
  });

  await client.connect()
  return client
}
