import { Router } from "express";

import { usersRoutes } from "./users.routes";
import { productsRoutes } from "./products.routes";

const appRoutes = Router()

appRoutes.use('/users', usersRoutes)
appRoutes.use('/products', productsRoutes)

export { appRoutes }
