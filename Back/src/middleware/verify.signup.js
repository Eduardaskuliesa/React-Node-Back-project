const userSchema = require('../schemas/userSchema')

const checkDubplicateUsername = ( req, res, next) => {
  userSchema.findOne({
    username: req.body.username
  }).then((err, user) => {
    if(err){
        return res.status(500).send({ message: "Failed! Username is already in use!"});
    }
    if(user){
       return res.status(400).send({ message: "Failed! Username is already in use!"})
    }
    next()
  })     
}

const verifySignup = {
    checkDubplicateUsername
};

module.exports = verifySignup