const express = require('express')
const router = express.Router()
const { login , register, signout} = require('../controllers/auth.controller')
const verifySignup = require('../middleware/verify.signup')
const  authJwt = require('../middleware/authJwt.js')
const { getUser, getAllUsers} = require('../controllers/user.controller.js')
const { updateUsername, updatePassword, updatePhoto } = require('../controllers/update.controller')


router.post('/register', verifySignup.checkDubplicateUsername, register)
router.post('/login', login)
router.post('/signout', signout)


router.get('/getAllUsers',  getAllUsers )
router.get('/getUser/:id', authJwt.verifyToken, getUser)


router.patch('/updateUsername/:id', verifySignup.checkDubplicateUsername, updateUsername )
router.patch('/updatePassword/:id', updatePassword)
router.patch('/updatePhoto/:id', updatePhoto)

module.exports = router