import { NumberColorFormat, faker } from "@faker-js/faker"

interface Product {
  name: string;
  price: number;
  image: string;
  id?: number;
}

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

  createProduct(): void {

  }

  getProducts(): Product[] {
    return this.products
  }

  getProductById(id: number): Product {
    return this.products.find(product => product.id === id)!;
  }

  updateProduct(): void {

  }

  deleteProduct(id: number): void {
    this.products = this.products.filter(product => product.id !== id)
  }
}

export default ProductService
