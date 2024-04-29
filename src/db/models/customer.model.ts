import { Model, DataTypes, Sequelize } from 'sequelize'
import { USER_TABLE } from './user.model'

type CustomSchemas = {
  [key: string]: any
}

export const CustomerSchema: CustomSchemas = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  lastName: {
    allowNull: false,
    field: 'last_name',
    type: DataTypes.STRING,
  },
  phone: {
    allowNull: false,
    type: DataTypes.STRING
  },
  createdAt: {
    type: DataTypes.DATEONLY,
    allowNull: false,
    defaultValue: Sequelize.fn('now'),
    field: "created_at"
  },
  updatedAt: {
    type: DataTypes.DATEONLY,
    allowNull: false,
    defaultValue: Sequelize.fn('now'),
    field: "updated_at"
  },
  userId: {
    field: 'user_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: USER_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  }
}

export const CUSTOMER_TABLE = 'customer'

export class Customer extends Model {
  static associate(models: any) {
    this.belongsTo(models.User, { as: 'user' })
  }

  static config(sequelize: Sequelize) {
    return {
      sequelize,
      tableName: CUSTOMER_TABLE,
      modelName: 'Customer',
      timestamp: false
    }
  }
}
