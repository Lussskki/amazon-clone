import express from 'express'
const router = new express.Router()
//Bcrypt
import bcrypt from 'bcrypt'

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
            res.status(201).json({message:'Registration: successfully'});
        }
    } catch (err) { 
        signale.error(`Post: registration error- ${err}`)
        res.status(422).send(err)
    }

})

//Post: login form
router.post('/login', async (req, res)=>{
    const {email,password} = req.body

    if(!email|| !password){
        res.status(400).json({message: 'Fill both'})
    } 
    
    try{
        const userLogin = await USER.findOne({email:email})
        if (userLogin) {
            const isMatch = await bcrypt.compare(password, userLogin.password)
            console.log("login:" + isMatch)
            if (!isMatch) {
              res.status(400).json({ message: 'Invalid match' })
            } else {
              // Token generate
              const token = await userLogin.generateAuthToken()
              console.log("token:" + token)
              
              res.status(201).json({ user: userLogin, token: token })
            }
          }
        } 
 
        catch (err) {
            console.error(err)
            res.status(400).json({ message: 'An error occurred' })
          }
          
})





export default router