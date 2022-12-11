import { User } from "@modules/users/typeorm/entities/User"
import { UsersRepository } from "@modules/users/typeorm/repositories/UsersRepository"
import { AppError } from "@shared/errors/AppError"
import { getCustomRepository } from "typeorm"

import { hash } from 'bcryptjs'

interface IRequest {
  name: string
  email: string
  password: string
}

class CreateUserUseCase {
  async execute({ name, email, password }: IRequest): Promise<User> {
    const usersRepository = getCustomRepository(UsersRepository)

    const userExists = await usersRepository.findByEmail(email)

    if (userExists) {      
      throw new AppError('User alredy exists.', 400)
    }

    const hashedPassword = await hash(password, 8)    

    const user = usersRepository.create({ 
      name,
      email,
      password: hashedPassword
    })

    await usersRepository.save(user)

    return user
  }
}

export { CreateUserUseCase }
