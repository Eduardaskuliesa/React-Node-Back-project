const userSchema = require('../schemas/userSchema')


const getAllUsers = async(req, res) => {
        const users = await userSchema.find({}, { username: 1, photo: 1} )
        res.send({ users })
    }


const getUser = async(req, res) => {
        const {id} = req.params
        const user = await userSchema.findOne({_id: id })
        if(!user){
            return res.status(204).json({ message: `User ID ${id} not found`})
        }
        res.send({ success: true, user})
    }
module.exports = {
    getAllUsers,
    getUser
}