import mongoose from 'mongoose'
//develpment
import signale from 'signale'
import dotenv from 'dotenv'
       dotenv.config()

const db = process.env.MONGODB

try{
    mongoose.connect(db)
    signale.success('Mongo: connected')
}catch(err){
    signale.error(`Mongo: error-${err}`)
} 

export default mongoose