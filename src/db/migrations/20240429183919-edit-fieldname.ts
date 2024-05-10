import { USER_TABLE, UserSchema } from '../models/user.model'
import { QueryInterface } from 'sequelize';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface: QueryInterface) {
    await queryInterface.changeColumn(USER_TABLE, 'created_at', UserSchema.createdAt);
    await queryInterface.changeColumn(USER_TABLE, 'updated_at', UserSchema.updatedAt);
  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.changeColumn(USER_TABLE, 'created_at', UserSchema.createdAt);
    await queryInterface.changeColumn(USER_TABLE, 'updated_at', UserSchema.updatedAt);
  }
};
