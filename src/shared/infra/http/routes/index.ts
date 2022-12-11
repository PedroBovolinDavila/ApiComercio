import { Router } from "express";

import { usersRoutes } from "./users.routes";
import { productsRoutes } from "./products.routes";
import { sessionsRoutes } from "./sessions.routes";

const appRoutes = Router()

appRoutes.use('/users', usersRoutes)
appRoutes.use('/products', productsRoutes)
appRoutes.use('/sessions', sessionsRoutes)

export { appRoutes }
