import { CATEGORIES_TABLE, CategorieSchema } from '../models/categories.model';
import { PRODUCTS_TABLE, ProductSchema } from '../models/product.model';
import { QueryInterface } from 'sequelize';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface: QueryInterface) {
    await queryInterface.createTable(CATEGORIES_TABLE, CategorieSchema);
    await queryInterface.createTable(PRODUCTS_TABLE, ProductSchema);
  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.dropTable(PRODUCTS_TABLE);
    await queryInterface.dropTable(CATEGORIES_TABLE);
  }
};
