import { Sequelize } from "sequelize";
import { User, UserSchema } from "./user.model";
import { Customer, CustomerSchema } from "./customer.model";

export const setupModels = (sequelize: Sequelize) => {
  User.init(UserSchema, User.config(sequelize))
  Customer.init(CustomerSchema, Customer.config(sequelize))

  User.associate(sequelize.models)
  Customer.associate(sequelize.models)
}
