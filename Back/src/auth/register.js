import bcrypt from 'bcrypt';
import { uid } from 'uid';
import userDetails from '../schemas/userDetails.js';
import registrationValidationSchema from './validation-schemas/register-validation.js';

export const register =  async(req, res) => {
      try {
        const { error } = registrationValidationSchema.validate(req.body);

        const { username, password } = req.body

        const hashedPassword = await bcrypt.hash(password, 10)

        const userInDb = new userDetails({
            secret: uid(),
            username,
            password:  hashedPassword
        })

        await userInDb.save()
        if (error) {
          return res.status(400).json({ message: error.details[0].message });
        } 
        return res.send({success: true, message: 'Succsefull you account is ready'})
      } catch (error) {
        return res.status(404).json({ error: 'User name is arleady taken :('})
      }
    };
    
    
