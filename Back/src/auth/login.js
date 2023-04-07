import bcrypt from 'bcrypt';
import loginValidationSchema from './validation-schemas/login-validation.js';
import userDetails from '../schemas/userDetails.js';

export const login = async(req, res) => {
    
    const { error } = loginValidationSchema.validate(req.body)

    const { username, password } = req.body
    
    const userExsits = await userDetails.findOne({ username })

    if(!userExsits) return res.send({success: false, message: "Bad credentials"})
    const passMatch = await bcrypt.compare(password, userExsits.password)

    if(!passMatch) return res.send({success: false, message: "Bad credentials"})

    return res.send({
        success: true,
        message: 'congratzz',
        secret: userExsits.secret,
        username: userExsits.username
    })
} 
        