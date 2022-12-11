import { EntityRepository, Repository } from "typeorm";
import { User } from "../entities/User";

@EntityRepository(User)
class UsersRepository extends Repository<User> {
  async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.findOne({ email })

    return user
  }

  async findByName(name: string): Promise<User | undefined> {
    const user = await this.findOne({ name })

    return user
  }

  async findById(id: string): Promise<User | undefined> {
    const user = await this.findOne(id)

    return user
  }
}

export { UsersRepository }
