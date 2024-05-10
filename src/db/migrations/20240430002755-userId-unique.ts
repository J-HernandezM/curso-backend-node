import { CUSTOMER_TABLE, CustomerSchema } from '../models/customer.model';
import { DataTypes, QueryInterface } from 'sequelize';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface: QueryInterface) {
    await queryInterface.changeColumn(CUSTOMER_TABLE, 'user_id', {
      field: 'user_id',
      allowNull: false,
      type: DataTypes.INTEGER,
      unique: true
    });
  },

  async down(queryInterface: QueryInterface) {
  }
};
