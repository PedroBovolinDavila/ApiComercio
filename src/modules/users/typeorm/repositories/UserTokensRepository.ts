import { EntityRepository, Repository } from "typeorm";
import { UserToken } from "../entities/UserToken";

@EntityRepository(UserToken)
class UserTokensRepository extends Repository<UserToken> {
  async findByToken(token: string): Promise<UserToken | undefined> {
    const userToken = await this.findOne({ token })

    return userToken
  }

  async generateToken(userId: string): Promise<UserToken | undefined> {
    const userToken = this.create({ user_id: userId })

    await this.save(userToken)

    return userToken
  }
}

export { UserTokensRepository }
