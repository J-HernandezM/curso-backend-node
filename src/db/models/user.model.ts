import { Model, DataTypes, Sequelize } from "sequelize";

type CustomSchemas = {
  [key: string]: any
}

export const USER_TABLE = 'users'

export const UserSchema: CustomSchemas = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  email: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: true,
  },
  password: {
    allowNull: false,
    type: DataTypes.STRING
  },
  role: {
    allowNull: false,
    type: DataTypes.STRING,
    defaultValue: 'customer'
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING,
    defaultValue: 'Jhon Doe'
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
  }
}

export class User extends Model {
  static associate() {

  }

  static config(sequelize: Sequelize) {
    return {
      sequelize,
      tableName: USER_TABLE,
      modelName: 'User',
      timestamps: false
    }
  }
}
