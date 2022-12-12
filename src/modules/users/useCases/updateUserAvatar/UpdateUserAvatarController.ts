import { Request, Response } from "express";
import { UpdateUserAvatarUseCase } from "./UpdateUserAvatarUseCase";

class UpdateUserAvatarController {
  async handle(req: Request, res: Response): Promise<Response> {
    const updateUserAvatarUseCase = new UpdateUserAvatarUseCase()

    const user = await updateUserAvatarUseCase.execute({
      userId: req.userId,
      avatarFilename: req.file?.filename!
    })

    return res.status(200).json({
      message: 'Avatar updated',
      statusCode: 200,
      user
    })
  }
}

export { UpdateUserAvatarController }
