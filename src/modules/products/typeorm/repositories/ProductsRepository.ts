import { AppError } from "@shared/errors/AppError";
import { EntityRepository, Repository } from "typeorm";
import { Product } from "../entities/Product";

@EntityRepository(Product)
class ProductRepository extends Repository<Product> {
  async findByName(name: string): Promise<Product | undefined> {
    const product = await this.findOne({ name })

    return product
  }

  async findById(id: string): Promise<Product | undefined> {
    const product = await this.findOne(id)

    return product
  }
}

export { ProductRepository }
