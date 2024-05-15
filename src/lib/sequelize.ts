import { Sequelize } from "sequelize";
import { config } from "../config/config";
import { setupModels } from "../db/models";

// const USER = encodeURIComponent(config.dbUser!);
// const PASSWORD = encodeURIComponent(config.dbPassword!);
// Para mysql usar puerto 33601, usamos root como usario, usamos la misma clave, el puerto debe ser 33061, de resto igual
// const URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`

export const sequelize = new Sequelize(config.dbUrl!, {
  dialect: 'postgres'
})

setupModels(sequelize)
