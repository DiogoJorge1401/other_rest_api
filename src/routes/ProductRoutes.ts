import { Router } from 'express'
import { deserializeUser, validate } from '../middlewares'
import {
  CreateProductHandler,
  DeleteProducteHandler,
  ReadProductHandler,
  UpdateProductHandler,
} from '../controllers/Product/product.controller'
import {
  CreateProductSchema,
  DeleteProductSchema,
  GetProductSchema,
  UpdateProductSchema,
} from '../schema/product.schema'

const productRoutes = Router()

/**
 * @openapi
 * '/api/product/{productId}':
 *  get:
 *    tags:
 *      - Product
 *    summary: Get a single product by the product id
 *    parameters:
 *      - name: productId
 *        in: path
 *        description: The id of product
 *        required: true
 *    responses:
 *       200:
 *         description: Success
 *         content:
 *          application/json:
 *           schema:
 *              $ref: '#/components/schema/Product'
 *       404:
 *         description: Product not found
 *         content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    default: Product not found
 */
productRoutes.get(
  '/product/:productId',
  validate(GetProductSchema),
  ReadProductHandler
)

productRoutes.use(deserializeUser)

productRoutes.post(
  '/product',
  validate(CreateProductSchema),
  CreateProductHandler
)

productRoutes.put(
  '/product/:productId',
  validate(UpdateProductSchema),
  UpdateProductHandler
)

productRoutes.delete(
  '/product/:productId',
  validate(DeleteProductSchema),
  DeleteProducteHandler
)

export { productRoutes }
