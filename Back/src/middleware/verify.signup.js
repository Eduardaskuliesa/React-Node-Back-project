const userSchema = require('../schemas/userSchema')

const checkDubplicateUsername = ( req, res, next) => {
  userSchema.findOne({
    username: req.body.username
  }).then((err, user) => {
    let username
    if("username" in req.body) {
      username = req.body.username
    }
    if (username.length < 5 || username.length > 20) return res.send({
      message: "username min 5, max 20 length"
    })
    if(err){
        return res.status(402).send({ message: "Failed! Username is already in use!"});
    }
    next()
  })

}

const verifySignup = {
    checkDubplicateUsername
};

module.exports = verifySignup