import { FilterQuery, UpdateQuery, QueryOptions } from 'mongoose'
import { ProductModel } from '../../models/Product/product.model'
import {
  ProductDocument,
  ProductInput,
} from '../../models/Product/ProductModelInterfaces'
import { databaseResponseTimeHistrogram } from '../../utils/Metrics'

export const CreateProduct = async (input: ProductInput) => {
  const metricsLabels = {
    operation: 'CreateProduct',
  }
  const timer = databaseResponseTimeHistrogram.startTimer()

  const product = await ProductModel.create(input)

  timer({ ...metricsLabels, success: 1 })

  return product
}
export const FindProduct = async (
  query: FilterQuery<ProductDocument>,
  options: QueryOptions = { lean: true }
) => {
  const metricsLabels = {
    operation: 'FindProduct',
  }

  const timer = databaseResponseTimeHistrogram.startTimer()

  const product = await ProductModel.findOne(query, {}, options)

  timer({ ...metricsLabels, success: 1 })

  if (!product) throw { message: 'Product not found', status: 404 }
  return product
}
export const UpdateProduct = async (
  { user, productId }: FilterQuery<ProductDocument>,
  update: UpdateQuery<ProductDocument>,
  options: QueryOptions = { lean: true }
) => {
  const product = await FindProduct({ productId })
  if (product.user.toString() !== user)
    throw { message: 'Unauthorized', status: 401 }

  await ProductModel.updateOne({ _id: product._id }, update, options)
}
export const DeleteProduct = async ({
  user,
  productId,
}: FilterQuery<ProductDocument>) => {
  const product = await FindProduct({ productId })
  if (product.user !== user) throw { message: 'Unauthorized', status: 401 }
  await ProductModel.deleteOne({ _id: user._id })
}
