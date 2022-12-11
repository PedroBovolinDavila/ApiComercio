import { Router } from "express";
import { productsRoutes } from "./products.routes";

const appRoutes = Router()

appRoutes.use('/products', productsRoutes)

export { appRoutes }
