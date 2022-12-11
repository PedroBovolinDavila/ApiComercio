import { Request, Response } from "express";
import { CreateSessionUseCase } from "./CreateSessionUseCase";

class CreateSessionController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body
    
    const createSessionUseCase = new CreateSessionUseCase()

    const { user, token } = await createSessionUseCase.execute({ email, password })

    return res.status(200).json({
      message: 'User logged',
      statusCode: 200,
      data: {
        user,
        token
      }
    })
  }
}

export { CreateSessionController }