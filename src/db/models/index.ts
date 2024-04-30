import { Sequelize } from "sequelize";
import { User, UserSchema } from "./user.model";
import { Customer, CustomerSchema } from "./customer.model";
import { Product, ProductSchema } from "./product.model";
import { Categorie, CategorieSchema } from "./categories.model";

export const setupModels = (sequelize: Sequelize) => {
  User.init(UserSchema, User.config(sequelize))
  Customer.init(CustomerSchema, Customer.config(sequelize))
  Categorie.init(CategorieSchema, CategorieSchema.config(sequelize))
  Product.init(ProductSchema, Product.config(sequelize))

  User.associate(sequelize.models)
  Customer.associate(sequelize.models)
  Categorie.associate(sequelize.models)
}
