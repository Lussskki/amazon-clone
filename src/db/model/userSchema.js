import mongoose from "mongoose"
//Validator
import validator from "validator"
//Hash password
import bcrypt from 'bcrypt'


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
        this.password = await bcrypt.hash(this.password, process.env.SALT)
        this.cpassword = await bcrypt.hash(this.cpassword, process.env.SALT)
    }
    next()
})

const USER = new mongoose.model('USER', userSchema)


export default USER 