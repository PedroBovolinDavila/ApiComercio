import { Request, Response } from "express";
import { ListUsersUseCase } from "./ListUsersUseCase";

class ListUsersController {
  async handle(req: Request, res: Response): Promise<Response> {
    const listUsersUseCase = new ListUsersUseCase()

    const users = await listUsersUseCase.execute()

    console.log(req.userId);

    return res.status(200).json({
      message: 'Listed users',
      statusCode: 200,
      users
    })
  }
}

export { ListUsersController }
