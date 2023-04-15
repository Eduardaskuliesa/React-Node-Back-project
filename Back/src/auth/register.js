const bcrypt = require('bcrypt')
const uid = require('uid')
const userSchema = require('../schemas/userSchema')
const registrationValidationSchema = require('../validation-schemas/register-validation.js')

module.exports = {
  register: async(req, res) => {
    try {
      const { error } = registrationValidationSchema.validate(req.body);

      const { username, password } = req.body
      const hashedPassword = await bcrypt.hash(password, 10)
   
      const userInDb = new userSchema({
          secret: uid(),
          username,
          password:  hashedPassword
      })

      await userInDb.save()


      if (error) {
        return res.status(400).json({ message: 'check backend for more info' });
      } 
      return res.send({success: true, message: 'Succsefull you account is ready'})
    } catch (error) {
      return res.status(404).json({ message: 'GG'})
    }
  }
} 
    
    
