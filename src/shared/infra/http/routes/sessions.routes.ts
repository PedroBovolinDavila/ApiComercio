import { Router } from "express";
import { celebrate, Joi, Segments } from "celebrate";

import { CreateSessionController } from "@modules/users/useCases/createSession/CreateSessionController";

const sessionsRoutes = Router()

const createSessionController = new CreateSessionController()

sessionsRoutes.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
      password: Joi.string().required()
    }
  }),
  createSessionController.handle
)

export { sessionsRoutes }
