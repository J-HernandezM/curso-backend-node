import { ORDER_PRODUCT_TABLE } from '../models/order-product.model';
import { ORDERS_TABLE } from '../models/order.model';
import { PRODUCTS_TABLE } from '../models/product.model';
import { DataTypes, QueryInterface } from 'sequelize';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface: QueryInterface) {
    await queryInterface.createTable(ORDER_PRODUCT_TABLE, {
      id: {
        primaryKey: true,
        allowNull: true,
        autoIncrement: true,
        type: DataTypes.INTEGER
      },
      amount: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      orderId: {
        field: 'order_id',
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: ORDERS_TABLE,
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      productId: {
        field: 'product_id',
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: PRODUCTS_TABLE,
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      }
    })
  },
  async down(queryInterface: QueryInterface) {
    await queryInterface.dropTable(ORDERS_TABLE)
  }
};
