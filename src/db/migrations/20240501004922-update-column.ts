import { PRODUCTS_TABLE, ProductSchema } from '../models/product.model';
import { QueryInterface } from 'sequelize';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface: QueryInterface) {
    await queryInterface.changeColumn(PRODUCTS_TABLE, 'category_id', ProductSchema.categorieId);
  },

  async down(queryInterface: QueryInterface) {
  }
};
