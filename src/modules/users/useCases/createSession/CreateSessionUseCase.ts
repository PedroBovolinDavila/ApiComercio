import auth from "@config/auth"
import { User } from "@modules/users/typeorm/entities/User"
import { UsersRepository } from "@modules/users/typeorm/repositories/UsersRepository"
import { AppError } from "@shared/errors/AppError"
import { compare } from "bcryptjs"
import { sign } from "jsonwebtoken"
import { getCustomRepository } from "typeorm"

interface IRequest {
  email: string
  password: string
}

interface IResponse {
  user: User
  token: string
}

class CreateSessionUseCase {
  async execute({ email, password }: IRequest): Promise<IResponse> {
    const usersRepository = getCustomRepository(UsersRepository)

    const user = await usersRepository.findByEmail(email)

    if (!user) {
      throw new AppError('Incorrect email/password', 401) 
    }

    const passwordMatch = await compare(password, user.password)

    if (!passwordMatch) {
      throw new AppError('Incorrect email/password', 401) 
    }

    const token = sign({}, auth.jwt.secret, {
      subject: user.id,
      expiresIn: auth.jwt.expiresIn
    })

    return {
      user,
      token
    }
  }
}

export { CreateSessionUseCase }
