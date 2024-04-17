import { faker } from "@faker-js/faker"
import { Product } from "./products.model";
import { conflict, notFound } from "@hapi/boom";
import { Pool } from "pg";
import { pool } from "../../lib/postgres.pool";

class ProductService {
  private products: Product[] = []
  private pool: Pool

  constructor() {
    this.generateProductArray();
    this.pool = pool
    this.pool.on('error', (err) => console.error(err))
  }

  generateProductArray(): void {
    for (let i = 1; i <= 100; i++) {
      this.products.push({
        id: i,
        name: faker.commerce.productName(),
        price: Number(faker.commerce.price()),
        image: faker.image.url(),
        blocked: faker.datatype.boolean()
      })
    }
  }

  createProduct(product: Product): Product {
    const { name, price, image, blocked } = product;
    const newProduct = {
      id: this.products.length + 1,
      name,
      image,
      price,
      blocked
    }

    this.products.push(newProduct)

    return newProduct
  }

  getProducts(): Promise<any> {
    // Connection to DB its asynchronous
    const query = 'SELECT * FROM tasks'
    return new Promise((resolve, reject) => {
      this.pool.query(query).then(rta => resolve(rta.rows))
    })
  }

  getProductById(id: number): Promise<Product> {
    return new Promise((resolve, reject) => {
      const i = this.products.findIndex(product => product.id === id)
      if (i === -1) { reject(notFound('Product not found')) }
      if (this.products[i].blocked === true) { reject(conflict('Product is blocked')) }

      resolve(this.products[i])
    })
  }

  updateProduct(id: number, changes: Product): Promise<Product> {
    return new Promise((resolve, reject) => {
      const i = this.products.findIndex(product => product.id === id)
      if (i === -1) { reject(notFound('Product not found')) }

      this.products[i] = {
        ...this.products[i],
        ...changes
      }

      resolve(this.products[i])
    })
  }

  deleteProduct(id: number): Promise<void> {
    return new Promise((resolve, reject) => {
      const exist = this.products.some(product => product.id === id)
      if (!exist) { reject(notFound('Product not found')) }

      this.products = this.products.filter(product => product.id !== id)
      resolve()
    })
  }
}

export default ProductService
