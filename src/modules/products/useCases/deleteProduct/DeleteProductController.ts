import { Request, Response } from "express";
import { DeleteProductUseCase } from "./DeleteProductUseCase";

class DeleteProductController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params

    const deleteProductUseCase = new DeleteProductUseCase()

    await deleteProductUseCase.execute({ id })

    return res.status(204).json({
      message: 'Product deleted',
      statusCode: 204
    })
  }
}

export { DeleteProductController }
