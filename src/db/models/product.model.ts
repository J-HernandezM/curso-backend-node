import { Model, DataTypes, Sequelize } from 'sequelize'
import { CATEGORIES_TABLE } from './categories.model'

type CustomSchemas = {
  [key: string]: any
}

export const ProductSchema: CustomSchemas = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  name: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  price: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  categorieId: {
    field: 'category_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: CATEGORIES_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATEONLY,
    field: 'created_at',
    defaultValue: Sequelize.fn('now'),
  }
}

export const PRODUCTS_TABLE = 'product'

export class Product extends Model {

  static associate(models: any) {
    this.belongsTo(models.Categorie, { as: 'categorie' })
  }

  static config(sequelize: Sequelize) {
    return {
      sequelize,
      tableName: PRODUCTS_TABLE,
      modelName: 'Product',
      timestamps: false
    }
  }
}

