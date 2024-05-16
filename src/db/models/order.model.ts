import { Model, DataTypes, Sequelize } from 'sequelize'
import { CUSTOMER_TABLE } from './customer.model'

type CustomSchemas = {
  [key: string]: any
}

export const ORDERS_TABLE = 'orders'

export const OrderSchema: CustomSchemas = {
  id: {
    primaryKey: true,
    autoIncrement: true,
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  customerId: {
    field: 'customer_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: CUSTOMER_TABLE,
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATEONLY,
    field: 'created_at',
    defaultValue: Sequelize.fn('now'),
  },
  total: {
    type: DataTypes.VIRTUAL,
    get() {
      if (this.items.length < 0) { return 0 }

      return this.items.reduce((t: number, item: any) => {
        return t + (item.price * item.OrderProduct.amount)
      }, 0)
    }
  }
}

export class Order extends Model {

  static associate(models: any) {
    this.belongsTo(models.Customer, { as: 'customer' })
    this.belongsToMany(
      models.Product, {
      as: 'items',
      through: models.OrderProduct,
      foreignKey: 'orderId',
      otherKey: 'productId'
    }
    )
  }

  static config(sequelize: Sequelize) {
    return {
      sequelize,
      tableName: ORDERS_TABLE,
      modelName: 'Order',
      timestamps: false
    }
  }

}
