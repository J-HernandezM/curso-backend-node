import { notFound } from "@hapi/boom";
import { Customer } from "../../db/models/customer.model";
import { sequelize } from "../../lib/sequelize";

export class CustomerService {
  getCustomers(): Promise<Customer[]> {
    return new Promise((resolve, reject) => {
      sequelize.models.Customer.findAll().then((res: any) => resolve(res))
        .catch(error => reject(error))
    })
  }

  findOne(id: number): Promise<Customer> {
    return new Promise((resolve, reject) => {
      sequelize.models.Customer.findByPk(id).then((res: any) => {
        if (!res) { reject(notFound('user not found')) }
        resolve(res)
      })
    })
  }

  createCustomer(customer: any): Promise<Customer> {
    return new Promise((resolve, reject) => {
      sequelize.models.Customer.create(customer).then(res => resolve(res))
        .catch(error => reject(error))
    })
  }

  async updateCustomer(id: number, changes: any): Promise<any> {
    const customer = await this.findOne(id)
    return new Promise((resolve, reject) => {
      customer.update(changes).then(res => resolve(res))
        .catch(error => reject(error))
    })
  }

  async deleteCustomer(id: number): Promise<void> {
    const customer = await this.findOne(id)
    return new Promise((resolve, reject) => {
      customer.destroy().then(res => resolve(res))
        .catch(error => reject(error))
    })
  }
}
