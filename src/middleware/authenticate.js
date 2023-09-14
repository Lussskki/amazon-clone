import jwt from 'jsonwebtoken' 
const secretKey = process.env.KEY
//Schema
import USER from '../db/model/userSchema.js'

const authenticate = async (req, res, next) => {
    try {
      const token = req.cookies['user-auth']
          //console.log('Received token:', token)
      const verifyToken = jwt.verify(token, secretKey)
          //console.log('Verified token:', verifyToken)
      const rootUser = await USER.findOne({ _id: verifyToken._id })
       console.log('Found user:', rootUser)
      if (!rootUser) { 
        console.log('User not found for _id:', verifyToken._id) 
        return res.status(404).json({ error: 'User not found' })
      }
      req.token = token
      req.rootUser = rootUser
      req.userID = rootUser._id
      next();
    } catch (err) {
      console.error(err)
      res.status(401).json({ error: 'Unauthorized: token provided' }) 
    }
  }
  
  export default authenticate
  