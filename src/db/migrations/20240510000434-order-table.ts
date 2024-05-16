import { CUSTOMER_TABLE } from '../models/customer.model';
import { ORDERS_TABLE } from '../models/order.model';
import { DataTypes, QueryInterface, Sequelize } from 'sequelize';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface: QueryInterface) {
    await queryInterface.createTable(ORDERS_TABLE, {
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
    })
  },
  async down(queryInterface: QueryInterface) {
    await queryInterface.dropTable(ORDERS_TABLE)
  }
};
