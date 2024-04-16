import { faker } from "@faker-js/faker"
import { User } from "./users.model"
import { notFound } from "@hapi/boom"
import { getConnection } from "../../lib/postgres"

export default class UserService {
  private users: User[] = []

  constructor() {
    this.generateUserArray()
  }

  generateUserArray() {
    for (let i = 0; i < 20; i++) {
      this.users.push({
        id: i,
        name: faker.person.fullName(),
        tasks: {
          id: i,
          title: `Buy some ${faker.commerce.productName()}`,
          completed: faker.datatype.boolean()
        },
        type: faker.person.jobDescriptor()
      })
    }
  };

  createUser(user: User): User {
    const { name, tasks, type } = user
    const newUser = {
      id: this.users.length + 1,
      name,
      tasks,
      type,
    }

    this.users.push(newUser)

    return newUser
  }

  getAll() {
    return new Promise((resolve, reject) => {
      resolve(this.users)
    })
  }

  getUserTasks() {
    return new Promise((resolve, reject) => {
      getConnection()
        .then(client => {
          client.query('SELECT * FROM tasks')
            .then(res => resolve(res.rows))
            .catch(error => reject(error))
          // .finally(() => client.end());
        })
        .catch(error => reject(error));
    })
  }

  getUserById(id: number): Promise<User> {
    return new Promise((resolve, reject) => {
      const index = this.users.findIndex(user => user.id === id)
      if (index === -1) { reject(notFound('Product not found')) }

      resolve(this.users[index])
    })
  }

  updateUser(id: number, changes: User): Promise<User> {
    return new Promise((resolve, reject) => {
      const index = this.users.findIndex(user => user.id === id)
      if (index === -1) { reject(notFound('user not found')) }

      const updatedUser = {
        ...this.users[index],
        ...changes
      }
      this.users.splice(index, 1, updatedUser)

      resolve(this.users[index])
    })
  }

  deleteUser(id: number): Promise<void> {
    return new Promise((resolve, reject) => {
      const index = this.users.findIndex(user => user.id === id)
      if (index === -1) { reject(notFound('user not found')) }
      this.users.splice(index, 1)
      resolve()
    })
  }



}
