import { USER_TABLE, UserSchema } from '../models/user.model'
import { QueryInterface } from 'sequelize';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface: QueryInterface) {
    await queryInterface.createTable(USER_TABLE, UserSchema);
  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.dropTable(USER_TABLE)
  }
};
