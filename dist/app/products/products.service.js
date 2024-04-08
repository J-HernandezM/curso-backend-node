"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const faker_1 = require("@faker-js/faker");
const boom_1 = require("@hapi/boom");
class ProductService {
    constructor() {
        this.products = [];
        this.generateProductArray();
    }
    generateProductArray() {
        for (let i = 1; i <= 100; i++) {
            this.products.push({
                id: i,
                name: faker_1.faker.commerce.productName(),
                price: Number(faker_1.faker.commerce.price()),
                image: faker_1.faker.image.url(),
                blocked: faker_1.faker.datatype.boolean()
            });
        }
    }
    createProduct(product) {
        const { name, price, image, blocked } = product;
        const newProduct = {
            id: this.products.length + 1,
            name,
            image,
            price,
            blocked
        };
        this.products.push(newProduct);
        return newProduct;
    }
    getProducts() {
        // Connection to DB its asynchronous
        return new Promise((resolve, reject) => {
            setTimeout(() => resolve(this.products), 1000);
        });
    }
    getProductById(id) {
        return new Promise((resolve, reject) => {
            const i = this.products.findIndex(product => product.id === id);
            if (i === -1) {
                reject((0, boom_1.notFound)('Product not found'));
            }
            if (this.products[i].blocked === true) {
                reject((0, boom_1.conflict)('Product is blocked'));
            }
            resolve(this.products[i]);
        });
    }
    updateProduct(id, changes) {
        return new Promise((resolve, reject) => {
            const i = this.products.findIndex(product => product.id === id);
            if (i === -1) {
                reject((0, boom_1.notFound)('Product not found'));
            }
            this.products[i] = {
                ...this.products[i],
                ...changes
            };
            resolve(this.products[i]);
        });
    }
    deleteProduct(id) {
        return new Promise((resolve, reject) => {
            const exist = this.products.some(product => product.id === id);
            if (!exist) {
                reject((0, boom_1.notFound)('Product not found'));
            }
            this.products = this.products.filter(product => product.id !== id);
            resolve();
        });
    }
}
exports.default = ProductService;
