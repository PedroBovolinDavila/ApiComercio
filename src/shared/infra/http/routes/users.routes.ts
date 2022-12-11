import { Router } from "express";
import { celebrate, Joi, Segments } from "celebrate";

import { ListUsersController } from "@modules/users/useCases/listUsers/ListUsersController";
import { CreateUserController } from "@modules/users/useCases/createUser/CreateUserController";

const usersRoutes = Router()

const listUsersController = new ListUsersController()
const createUserController = new CreateUserController()

usersRoutes.get('/', listUsersController.handle)

usersRoutes.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(6).required()
    }
  }),
  createUserController.handle
)

export { usersRoutes }
