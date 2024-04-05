import { faker } from "@faker-js/faker"
import { Product } from "./products.model";

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
        image: faker.image.url()
      })
    }
  }

  createProduct(product: Product): Product {
    const { name, price, image } = product;
    const newProduct = {
      id: this.products.length + 1,
      name,
      image,
      price
    }

    this.products.push(newProduct)

    return newProduct
  }

  getProducts(): Product[] {
    return this.products
  }

  getProductById(id: number): Product {
    return this.products.find(product => product.id === id)!;
  }

  updateProduct(id: number, changes: Product): Product {
    const i = this.products.findIndex(product => product.id === id)
    if (i === -1) { throw new Error('Product not found') }

    this.products[i] = {
      ...this.products[i],
      ...changes
    }

    return this.products[i]
  }

  deleteProduct(id: number): void {
    const exist = this.products.some(product => product.id === id)
    if (!exist) { throw new Error('Product not found') }

    this.products = this.products.filter(product => product.id !== id)
  }
}

export default ProductService
