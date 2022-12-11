import { User } from "@modules/users/typeorm/entities/User";
import { UsersRepository } from "@modules/users/typeorm/repositories/UsersRepository";
import { getCustomRepository } from "typeorm";

class ListUsersUseCase {
  async execute(): Promise<User[]> {
    const usersRepository = getCustomRepository(UsersRepository)

    const users = await usersRepository.find()

    return users
  }
}

export { ListUsersUseCase }
