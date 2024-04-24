import { Sequelize } from "sequelize";
import { config } from "../config/config";
import { setupModels } from "../db/models";

const USER = encodeURIComponent(config.dbUser!);
const PASSWORD = encodeURIComponent(config.dbPassword!);
// Para mysql usar puerto 3, usamos root como usario, usamos la misma clave, el puerto debe ser 33061, de resto igual
const URI = `mysql://root:${PASSWORD}@${config.dbHost}:${config.dbPort}1/${config.dbName}`

export const sequelize = new Sequelize(URI, {
  dialect: 'mysql'
})

setupModels(sequelize)
sequelize.sync()
