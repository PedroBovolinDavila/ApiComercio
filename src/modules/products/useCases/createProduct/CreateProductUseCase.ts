import { Product } from "@modules/products/typeorm/entities/Product"
import { AppError } from "@shared/errors/AppError"
import { getCustomRepository } from "typeorm"
import { ProductRepository } from '../../typeorm/repositories/ProductsRepository'

interface IRequest {
  name: string
  price: number
  quantity: number
}

class CreateProductUseCase {
  async execute({ name, price, quantity }: IRequest): Promise<Product> {
    const productRepository = getCustomRepository(ProductRepository)

    const productExists = await productRepository.findByName(name)

    if (productExists) {      
      throw new AppError('Product alredy exists.', 400)
    }

    const product = productRepository.create({ 
      name,
      price,
      quantity
    })

    await productRepository.save(product)

    return product
  }
}

export { CreateProductUseCase }
