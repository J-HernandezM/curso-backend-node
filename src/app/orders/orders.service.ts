import { Order } from "../../db/models/order.model";
import { sequelize } from "../../lib/sequelize";

export class OrderService {
  getOrders(): Promise<Order[]> {
    return new Promise((resolve, reject) => {
      sequelize.models.Order.findAll()
        .then(res => resolve(res))
        .catch(err => reject(err))
    })
  }

  findOne(id: number): Promise<Order> {
    return new Promise((resolve, reject) => {
      sequelize.models.Order.findByPk(id, {
        include: [{
          model: sequelize.models.Customer,
          as: 'customer',
          attributes: ['name'],
          include: [{
            model: sequelize.models.User,
            as: 'user',
            attributes: ['email'],
          }]
        }]
      })
        .then((res: any) => resolve(res))
        .catch(err => reject(err))
    })
  }

  findByCustomer(id: number): Promise<Order> {
    return new Promise((resolve, reject) => {
      sequelize.models.Order.findAll()
        .then((res: any) => resolve(res))
        .catch(err => reject(err))
    })
  }

  createOrder(order: any): Promise<Order> {
    return new Promise((resolve, reject) => {
      sequelize.models.Order.create(order)
        .then((res: any) => resolve(res))
        .catch(err => reject(err))
    })
  }

  async updateOrder(id: number, changes: any): Promise<any> {
    const order = await this.findOne(id)

    return new Promise((resolve, reject) => {
      order.update(changes)
        .then((res: any) => resolve(res))
        .catch(err => reject(err))
    })
  }

  async deleteOrder(id: number): Promise<any> {
    const order = await this.findOne(id)

    return new Promise((resolve, reject) => {
      order.destroy()
        .then((res: any) => resolve(res))
        .catch(err => reject(err))
    })
  }
}
