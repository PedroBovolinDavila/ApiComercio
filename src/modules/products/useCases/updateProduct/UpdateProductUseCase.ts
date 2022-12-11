import { Product } from "@modules/products/typeorm/entities/Product"
import { ProductRepository } from "@modules/products/typeorm/repositories/ProductsRepository"
import { AppError } from "@shared/errors/AppError"
import { getCustomRepository } from "typeorm"

interface IRequest {
  id: string
  name: string
  quantity: number
  price: number
}

class UpdateProductUseCase {
  async execute({ id, name, quantity, price }: IRequest): Promise<Product> {
    const productsRepository = getCustomRepository(ProductRepository)

    const product = await productsRepository.findById(id)

    if (!product) {
      throw new AppError('Product does not exists', 404)
    }

    const productExists = await productsRepository.findByName(name)

    if (productExists && name !== product.name) {
      throw new AppError('Name already registered', 400)
    }

    product.name = name
    product.price = price
    product.quantity = quantity

    await productsRepository.save(product)

    return product
  }
}

export { UpdateProductUseCase }
