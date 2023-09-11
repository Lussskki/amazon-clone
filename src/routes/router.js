import express from 'express'
const router = new express.Router()

//Products schema
import productsSchema from '../db/model/productsSchema.js'
//Users schema
import USER from '../db/model/userSchema.js'

//Development
import signale from 'signale'

//Get: products data api 
router.get('/getProducts', async (req, res, next)=>{
    try{
        const productsData = await productsSchema.find()
        res.status(200).json({message: productsData})
    } catch(err)
    {
        signale.error(`Get: error- ${err}`)
    }
})
 
//Get: products individual data
router.get('/getProductsOne/:id', async (req, res, next) => {
    const { id } = req.params        
    try {
        const individualData = await productsSchema.findOne({ id: id })
        if (!individualData) { 
            return res.status(404).json({ message: 'Product not found' })
        }  
        res.json(individualData)
    } catch (err) {
        next(err)
    }
})

//Post: registration form
router.post("/register", async (req, res) => {
    const { fname, email, mobile, password, cpassword } = req.body
    if (!fname || !email || !mobile || !password || !cpassword) {
        res.status(422).json({ error: "Fill the all details" })
    }
    try {
        const preuser = await USER.findOne({ email: email })
        if (preuser) {
            res.status(422).json({ error: "This user already registered" })
        } else if (password !== cpassword) {
            res.status(422).json({ error: "Password are not matching" })
        } else {
            const finalUser = new USER({
                fname, 
                email, 
                mobile, 
                password, 
                cpassword
            })
            const storedata = await finalUser.save();           
            res.status(201).json(storedata);
        }
    } catch (err) { 
        signale.error(`Post: registration error- ${err}`)
        res.status(422).send(err)
    }

})






export default router