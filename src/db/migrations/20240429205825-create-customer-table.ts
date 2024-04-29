import { CUSTOMER_TABLE, CustomerSchema } from '../models/customer.model';
import { QueryInterface } from 'sequelize';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface: QueryInterface) {
    await queryInterface.createTable(CUSTOMER_TABLE, CustomerSchema);
  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.dropTable(CUSTOMER_TABLE)
  }
};
