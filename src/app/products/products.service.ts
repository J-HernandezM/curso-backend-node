import { notFound } from "@hapi/boom";
import { sequelize } from "../../lib/sequelize";
import { Product } from "../../db/models/product.model";
import { FindOptions, WhereOptions } from "sequelize";
import QueryString from "qs";
import { Op } from "sequelize";

interface PriceWhereOption {
  price: number
}

interface CustomFindOptions extends FindOptions {
  where: WhereOptions<any>
}

export class ProductService {
  getProducts(query: QueryString.ParsedQs): Promise<Product[]> {
    const { limit, offset, price_min, price_max } = query;
    const options: CustomFindOptions = {
      include: ['categorie'],
      where: {}
    }

    // If limit and offset do exist, then add them to the options of the sql querie
    if (limit && offset) {
      options.limit = +limit;
      options.offset = +offset;
    }

    // If price exist then
    if (price_min && price_max) {
      options.where = {
        price: {
          [Op.between]: [price_min, price_max]
        }
      }
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
