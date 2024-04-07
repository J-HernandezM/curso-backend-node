import { faker } from "@faker-js/faker"
import { Product } from "./products.model";
import { conflict, notFound } from "@hapi/boom";

class ProductService {
  private products: Product[] = []

  constructor() {
    this.generateProductArray();
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

  getProducts(): Promise<Product[]> {
    // Connection to DB its asynchronous
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve(this.products), 1000)
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
