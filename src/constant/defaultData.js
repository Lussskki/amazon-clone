import mongoose from 'mongoose'
import productsSchema from '../db/model/productsSchema.js'
import productsData from './productsData.js'

const defaultData = async () => {
const session = await mongoose.startSession()
      session.startTransaction()

  try {
    // Clear existing data
    await productsSchema.deleteMany({}, { session })

    // Insert new data
    for (const productData of productsData) {
      const product = new productsSchema(productData)
      await product.save({ session })
    }

    await session.commitTransaction()
    session.endSession()

    // console.log('Default data inserted successfully.')
  } catch (err) {
    await session.abortTransaction()
    session.endSession()
    // console.error(`DefaultData: error - ${err}`)
  }
};

export default defaultData
