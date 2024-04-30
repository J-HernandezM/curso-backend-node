import { notFound } from "@hapi/boom";
import { sequelize } from "../../lib/sequelize";
import { Categorie } from "../../db/models/categories.model";

export class CategorieService {
  getCategories(): Promise<Categorie[]> {
    return new Promise((resolve, reject) => {
      sequelize.models.Categorie.findAll({
      }).then((res: any) => resolve(res))
        .catch(error => reject(error))
    })
  }

  findOne(id: number): Promise<Categorie> {
    return new Promise((resolve, reject) => {
      sequelize.models.Categorie.findByPk(id).then((res: any) => {
        if (!res) { reject(notFound('user not found')) }
        resolve(res)
      })
    })
  }

  createCategorie(customer: any): Promise<Categorie> {
    return new Promise((resolve, reject) => {
      sequelize.models.Categorie.create(customer, {
      })
        .then(res => resolve(res))
        .catch(error => reject(error))
    })
  }

  async updateCategorie(id: number, changes: any): Promise<any> {
    const categorie = await this.findOne(id)
    return new Promise((resolve, reject) => {
      categorie.update(changes).then(res => resolve(res))
        .catch(error => reject(error))
    })
  }

  async deleteCategorie(id: number): Promise<void> {
    const categorie = await this.findOne(id)
    return new Promise((resolve, reject) => {
      categorie.destroy().then(res => resolve(res))
        .catch(error => reject(error))
    })
  }
}
