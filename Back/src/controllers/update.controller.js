const userSchema = require('../schemas/userSchema')
const bcrypt = require('bcrypt');
const id = require('faker/lib/locales/id_ID');
const { Validator} = require('node-input-validator')

const updateUsername = async (req, res) => {
    try {
        const { id } = req.params
        const { username, secret } = req.body
        
        const secretExist = await userSchema.findOne({ secret })
        if(!secret) return res.status(404).json({ message: "Wrong secret my guy."})
        if(username === null) return res.status(221).json({ message: 'Username cant be empy'})
        const update = await userSchema.findOneAndUpdate({secret: id}, {$set:{username: username}}, {new: true})
        
        res.status(200).send({
            message: 'You username updated',
            username: username,
        })
    }catch(err){
        console.log(err)
    }
}

const updatePassword = async (req, res ) =>{
    try { 
        const {id} = req.params
        const { password, secret } = req.body 

        const hashedPassword = await bcrypt.hash(password, 10)

        const update = await userSchema.findOneAndUpdate({secret: id}, {$set:{password: hashedPassword}}, {new: true})

        res.status(200).send({ 
            message: 'Your password was changed'
        })
    }catch(err){
        console.log(err)
    }
}

const updatePhoto = async(req, res) => {
    try{
        const { id } = req.params
        const { photo } = req.body

        const update = await userSchema.findOneAndUpdate({secret: id}, {$set:{photo: photo}}, {new: true})

        res.status(200).send({
            message: 'Succes you photo will aply after logout'
        })
    }catch(err){
        console.log(err)
    }
}


module.exports = {
    updateUsername,
    updatePassword,
    updatePhoto
}