import { Product } from "@modules/products/typeorm/entities/Product";
import { ProductRepository } from "@modules/products/typeorm/repositories/ProductsRepository";
import { getCustomRepository } from "typeorm";

class ListProductsUseCase {
  async execute(): Promise<Product[]> {
    const productsRepository = getCustomRepository(ProductRepository)

    const products = await productsRepository.find()

    return products
  }
}

export { ListProductsUseCase }
