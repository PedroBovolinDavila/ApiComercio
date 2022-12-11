import { Request, Response } from "express";
import { ShowProductUseCase } from "./ShowProductUseCase";

class ShowProductController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params

    const showProductUseCase = new ShowProductUseCase()

    const product = await showProductUseCase.execute({ id })

    return res.status(200).json({
      message: 'Listed product',
      statusCode: 200,
      product
    })
  }
}

export { ShowProductController }
