const config = require('../config/auth.config')
const userSchema = require('../schemas/userSchema')
const uid = require('uid')


const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const registrationValidationSchema = require('../validation-schemas/register-validation')
const loginValidationSchema = require('../validation-schemas/login-validation')


module.exports = {
    register: async(req, res) => {

        const { error } = registrationValidationSchema.validate(req.body ,{abortEarly: false})

        const {password, username, photo } = req.body
        
        const hashedPassword = await bcrypt.hash(password, 10)

        const user = new userSchema({
            username,
            secret: uid.uid(),
            password: hashedPassword,
            photo: ''
          });
          try {
            const newUser = await user.save();
            res.status(201).json({success: true ,message: 'you register was successfull'});
          } catch (error) {
            res.status(400).json({ message: error.message });
          }
    },


    login : async (req, res) => {
        const { error } = loginValidationSchema.validate(req.body)

        const { username, password, secret} = req.body
        const userExsits = await userSchema.findOne({ username })

        if(!userExsits) return res.status(404).json({ message: "User Not found."})

        const passMatch = await bcrypt.compare(password, userExsits.password)
        if(!passMatch) return res.status(404).json({ message: 'Invalid password.'})

        let token = jwt.sign({id: secret}, config.secret, {
            expiresIn: 300,
        })
        
        req.session.token = token
        const users = await userSchema.find({}, { username: 1})

        res.status(200).send({
            success: true,
            username: username,
            secret: userExsits.secret,
            token: token,
            photo: userExsits.photo
        })
    },

    signout: async( req, res ) => {
        try {
            req.session = null
            return res.status(200).send({message: "You've been signed out!"})
        }catch (err) {
            this.next(err)
        }
    }
}
       