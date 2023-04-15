const bcrypt = require('bcrypt')
const loginValidationSchema = require('../validation-schemas/login-validation.js')
const userSchema = require('../schemas/userSchema.js')

module.exports = {
    login: async(req, res) => {
    
        const { error } = loginValidationSchema.validate(req.body)
    
        const { username, password } = req.body
        
        const userExsits = await userSchema.findOne({ username })
    
        if(!userExsits) return res.status(403).json({success: false, message: "Bad credentials"})
        const passMatch = await bcrypt.compare(password, userExsits.password)
    
        if(!passMatch) return res.status(403).json({success: false, message: "Bad credentials"})
    
    
        return res.send({
            success: true,
            message: 'congratzz',
            secret: userExsits.secret,
            username: userExsits.username,
        })
} 
}

        