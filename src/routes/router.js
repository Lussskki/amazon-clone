import express from 'express'
const router = new express.Router()

//products schema
import productsSchema from '../db/model/productsSchema.js'

//development
import signale from 'signale'

//get products data api 
router.get('/getProducts', async (req, res, next)=>{
    try{
        const productsData = await productsSchema.find()
        res.status(200).json({message: productsData})
    } catch(err)
    {
        signale.error(`Get: error- ${err}`)
    }
})
 
//get products individual data
router.get('/getProductsOne/:id', async (req, res, next) => {
    try {
        const { id } = req.params        
        const individualData = await productsSchema.findOne({ id: id })
        if (!individualData) { 
            return res.status(404).json({ message: 'Product not found' })
        }  
        res.json(individualData)
    } catch (err) {
        next(err)
    }
})






export default router