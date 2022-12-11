import { Request, Response } from "express";
import { CreateProductUseCase } from "./CreateProductUseCase";

class CreateProductController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { name, price, quantity } = req.body

    const createProductUseCase = new CreateProductUseCase()

    const product = await createProductUseCase.execute({ name, price, quantity })

    return res.status(201).json({
      message: 'Product created',
      statusCode: 201,
      product
    })
  }
}

export { CreateProductController }
