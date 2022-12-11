import { Product } from "@modules/products/typeorm/entities/Product";
import { ProductRepository } from "@modules/products/typeorm/repositories/ProductsRepository";
import { AppError } from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";

interface IRequest {
  id: string
}

class DeleteProductUseCase {
  async execute({ id }: IRequest): Promise<void> {
    const productsRepository = getCustomRepository(ProductRepository)

    const product = await productsRepository.findById(id)

    if (!product) {
      throw new AppError('Product does not exists', 404)
    }  

    await productsRepository.remove(product)
  }
}

export { DeleteProductUseCase }
