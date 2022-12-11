import { Request, Response } from "express";
import { UpdateProductUseCase } from "./UpdateProductUseCase";

class UpdateProductController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params
    const { name, price, quantity } = req.body

    const updaetProductUseCase = new UpdateProductUseCase()

    const product = await updaetProductUseCase.execute({
      id,
      name, 
      price,
      quantity
    })

    return res.status(200).json({
      message: 'Updated product',
      statusCode: 200,
      product
    })
  }
}

export { UpdateProductController }
