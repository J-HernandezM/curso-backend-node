import { Sequelize } from "sequelize";
import { User, UserSchema } from "./user.model";

export const setupModels = (sequelize: Sequelize) => {
  User.init(UserSchema, User.config(sequelize))
}
