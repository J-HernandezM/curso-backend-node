import { notFound } from "@hapi/boom";
import { sequelize } from "../../lib/sequelize";
import { Product } from "../../db/models/product.model";
import { FindOptions } from "sequelize";
import QueryString from "qs";

export class ProductService {
  getProducts(query: QueryString.ParsedQs): Promise<Product[]> {
    const { limit, offset } = query;
    const options: FindOptions<any> = {
      include: ['categorie']
    }
    if (limit && offset) {
      options.limit = +limit;
      options.offset = +offset;
    }

    return new Promise((resolve, reject) => {
      sequelize.models.Product.findAll(options)
        .then((res: any) => resolve(res))
        .catch(error => reject(error))
    })
  }

  findOne(id: number): Promise<Product> {
    return new Promise((resolve, reject) => {
      sequelize.models.Product.findByPk(id).then((res: any) => {
        if (!res) { reject(notFound('user not found')) }
        resolve(res)
      })
    })
  }

  createProduct(customer: any): Promise<Product> {
    return new Promise((resolve, reject) => {
      sequelize.models.Product.create(customer, {
      })
        .then(res => resolve(res))
        .catch(error => reject(error))
    })
  }

  async updateProduct(id: number, changes: any): Promise<any> {
    const product = await this.findOne(id)
    return new Promise((resolve, reject) => {
      product.update(changes).then(res => resolve(res))
        .catch(error => reject(error))
    })
  }

  async deleteProduct(id: number): Promise<void> {
    const product = await this.findOne(id)
    return new Promise((resolve, reject) => {
      product.destroy().then(res => resolve(res))
        .catch(error => reject(error))
    })
  }
}
