import multer from "multer";
import { Router } from "express";
import uploadConfig from "@config/upload";
import { celebrate, Joi, Segments } from "celebrate";

import { ListUsersController } from "@modules/users/useCases/listUsers/ListUsersController";
import { CreateUserController } from "@modules/users/useCases/createUser/CreateUserController";
import { UpdateUserAvatarController } from "@modules/users/useCases/updateUserAvatar/UpdateUserAvatarController";

import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const upload = multer(uploadConfig)

const usersRoutes = Router()

const listUsersController = new ListUsersController()
const createUserController = new CreateUserController()
const updateUserAvatarController = new UpdateUserAvatarController()

usersRoutes.get('/', ensureAuthenticated, listUsersController.handle)

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

usersRoutes.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  updateUserAvatarController.handle
)

export { usersRoutes }
