import upload from "@config/upload"
import { UsersRepository } from "@modules/users/typeorm/repositories/UsersRepository"
import { AppError } from "@shared/errors/AppError"
import path from "path"
import { getCustomRepository } from "typeorm"
import fs from 'fs'
import { User } from "@modules/users/typeorm/entities/User"

interface IRequest {
  userId: string
  avatarFilename: string
}

class UpdateUserAvatarUseCase {
  async execute({ userId, avatarFilename }: IRequest): Promise<User> {
    const usersRepository = getCustomRepository(UsersRepository)

    const user = await usersRepository.findById(userId)

    if (!user) {
      throw new AppError('User does not exist', 400)
    }

    if (user.avatar) {
      const filePath = path.join(upload.directory, user.avatar)
      const fileExists = await fs.promises.stat(filePath)

      if (fileExists) {
        await fs.promises.unlink(filePath)
      }
    }

    user.avatar = avatarFilename

    await usersRepository.save(user)

    return user
  }
}

export { UpdateUserAvatarUseCase }
