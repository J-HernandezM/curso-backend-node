import { Sequelize } from "sequelize";
import { User, UserSchema } from "./user.model";
import { Customer, CustomerSchema } from "./customer.model";
import { Product, ProductSchema } from "./product.model";
import { Categorie, CategorieSchema } from "./categories.model";
import { Order, OrderSchema } from "./order.model";
import { OrderProduct, OrderProductSchema } from "./order-product.model";

export const setupModels = (sequelize: Sequelize) => {
  User.init(UserSchema, User.config(sequelize))
  Customer.init(CustomerSchema, Customer.config(sequelize))
  Categorie.init(CategorieSchema, Categorie.config(sequelize))
  Product.init(ProductSchema, Product.config(sequelize))
  Order.init(OrderSchema, Order.config(sequelize))
  OrderProduct.init(OrderProductSchema, OrderProduct.config(sequelize))

  User.associate(sequelize.models)
  Customer.associate(sequelize.models)
  Categorie.associate(sequelize.models)
  Product.associate(sequelize.models)
  Order.associate(sequelize.models)
}
