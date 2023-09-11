import express from 'express'
const app = express()

//development
import signale from 'signale'
import bodyParser from 'body-parser'


//db path
import mongoose from '../src/db/mongo.js'

//default data
import defaultData from './constant/defaultData.js'

//routes
import router from './routes/router.js'


//middleware
app.use(bodyParser.json())


//routes
app.use(router)

//function invoke
defaultData()




app.listen(3000,()=>{
    signale.success('Port: connected 3000')
})