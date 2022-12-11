import { Router } from "express";
import { celebrate, Joi, Segments } from "celebrate";

import { ShowProductController } from "@modules/products/useCases/showProduct/ShowProductController";
import { ListProductController } from "@modules/products/useCases/listProducts/ListProductController";
import { UpdateProductController } from "@modules/products/useCases/updateProduct/UpdateProductController";
import { DeleteProductController } from "@modules/products/useCases/deleteProduct/DeleteProductController";
import { CreateProductController } from "@modules/products/useCases/createProduct/CreateProductController";

const productsRoutes = Router()

const showProductController = new ShowProductController()
const listProductsController = new ListProductController()
const createProductContoller = new CreateProductController()
const updateProductController = new UpdateProductController()
const deleteProductController = new DeleteProductController()

productsRoutes.get('/', listProductsController.handle)
productsRoutes.get(
  '/:id', 
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required()
    }
  }),
  showProductController.handle
)

productsRoutes.post(
  '/', 
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      price: Joi.number().precision(2).greater(0).required(),
      quantity: Joi.number().required()
    }
  }),
  createProductContoller.handle
)

productsRoutes.put(
  '/:id',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      price: Joi.number().precision(2).greater(0).required(),
      quantity: Joi.number().required()
    },
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required()
    }
  }),
  updateProductController.handle
)

productsRoutes.delete(
  '/:id', 
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required()
    }
  }),
  deleteProductController.handle
)

export { productsRoutes }