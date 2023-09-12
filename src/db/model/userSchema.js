import mongoose from "mongoose"
//Validator
import validator from "validator"
//Hash password
import bcrypt from 'bcrypt'
//Webtoken
import jwt from 'jsonwebtoken'
const secretKey = process.env.KEY

//Schema
const userSchema = new mongoose.Schema({
    fname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error ('not valid email adress')
            }
        }
    },
    mobile: {
        type: String,
        required: true,
        unique: true,
        maxlenght: 10,
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    cpassword: {
        type: String,
        required: true, 
        minlength: 6
    },
    createdAt: {
        type: Date,
        default:Date.now()
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }],
    carts: Array        
})
//Hash password
userSchema.pre('save', async function hash (next){
    if (this.isModified('password')){
        this.password = await bcrypt.hash(this.password, 10)
        this.cpassword = await bcrypt.hash(this.cpassword, 10)
    }
    next()
})
//Generate token
userSchema.methods.generateAuthToken = async function(){
    try{
        let token = jwt.sign({_id:this._id},secretKey)
        this.tokens = this.tokens.concat({token:token})
        await this.save()
        
        return token
    }catch(err){
        signale.error(`Generate_token: error- ${err}`)
    }
}
 

const USER = new mongoose.model('USER', userSchema)


export default USER 