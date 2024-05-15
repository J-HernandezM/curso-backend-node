import { DataTypes, Model, Sequelize } from "sequelize"
import { ORDERS_TABLE } from "./order.model"
import { PRODUCTS_TABLE } from "./product.model"

type CustomSchemas = {
  [key: string]: any
}


export const ORDER_PRODUCT_TABLE = 'order_products'

export const OrderProductSchema: CustomSchemas = {
  id: {
    primaryKey: true,
    allowNull: true,
    autoIncrement: true,
    type: DataTypes.INTEGER
  },
  amount: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  orderId: {
    field: 'order_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: ORDERS_TABLE,
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  },
  productId: {
    field: 'product_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: PRODUCTS_TABLE,
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  }
}

export class OrderProduct extends Model {
  static assosiacte() {

  }

  static config(sequelize: Sequelize) {
    return {
      sequelize,
      modelName: 'OrderProduct',
      tableName: ORDER_PRODUCT_TABLE,
      timestamps: false
    }
  }
}
