import { QueryInterface } from 'sequelize';
import { ORDERS_TABLE, OrderSchema } from '../models/order.model';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface: QueryInterface) {
    await queryInterface.addColumn(ORDERS_TABLE, 'total', OrderSchema.total)
  },
  async down(queryInterface: QueryInterface) {
    await queryInterface.removeColumn(ORDERS_TABLE, 'total')
  }
};
