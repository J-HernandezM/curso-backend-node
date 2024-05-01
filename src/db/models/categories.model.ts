import { Model, DataTypes, Sequelize } from 'sequelize'

type CustomSchemas = {
  [key: string]: any
}

export const CategorieSchema: CustomSchemas = {
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
  image: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATEONLY,
    field: 'created_at',
    defaultValue: Sequelize.fn('now'),
  }
}

export const CATEGORIES_TABLE = 'categorie'

export class Categorie extends Model {

  static associate(models: any) {
    this.hasMany(models.Product, {
      as: 'product',
      foreignKey: 'categorieId'
    })
  }

  static config(sequelize: Sequelize) {
    return {
      sequelize,
      tableName: CATEGORIES_TABLE,
      modelName: 'Categorie',
      timestamps: false
    }
  }
}

