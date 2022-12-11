import { Request, Response } from "express";
import { ListProductsUseCase } from "./ListProductsUseCase";

class ListProductController {
  async handle(req: Request, res: Response): Promise<Response> {
    const listProductsUseCase = new ListProductsUseCase()

    const products = await listProductsUseCase.execute()

    return res.status(200).json({
      message: 'Listed products',
      statusCode: 200,
      products
    })
  }
}

export { ListProductController }
