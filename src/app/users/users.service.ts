import { notFound } from "@hapi/boom"
import { sequelize } from "../../lib/sequelize"
import { User } from "../../db/models/user.model"

export default class UserService {
  private users: User[] = []

  constructor() {
  }

  createUser(user: any): Promise<User> {
    return new Promise((resolve, reject) => {
      sequelize.models.User.create(user).then((res: any) => resolve(res))
        .catch(error => reject(error))
    })
  }

  getAll(): Promise<User[]> {
    return new Promise((resolve, reject) => {
      sequelize.models.User.findAll().then((res: any) => resolve(res))
        .catch(error => reject(error))
    })
  }

  findOne(id: number): Promise<User> {
    return new Promise((resolve, reject) => {
      sequelize.models.User.findByPk(id).then((res: any) => {
        if (!res) { reject(notFound('user not found')) }
        resolve(res)
      })
    })
  }

  getUserTasks() {
    const query = 'SELECT * FROM tasks'

    return new Promise((resolve, reject) => {
      sequelize.query(query).then((res: any) => resolve(res[0]))
        .catch(error => reject(error))
    })
  }

  async updateUser(id: number, changes: any): Promise<any> {
    const user = await this.findOne(id);

    return new Promise((resolve, reject) => {
      user.update(changes).then(res => resolve(res))
        .catch(error => reject(error))
    })
  }

  async deleteUser(id: number): Promise<void> {
    const user = await this.findOne(id)

    return new Promise((resolve, reject) => {
      user.destroy().then(res => resolve())
        .catch(error => reject(error))
    })
  }



}
