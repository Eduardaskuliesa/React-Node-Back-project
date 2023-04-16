const express = require('express')
const router = express.Router()
const { login , register, signout} = require('../controllers/auth.controller')
const verifySignup = require('../middleware/verify.signup')
const  authJwt = require('../middleware/authJwt.js')
const { getUser, getAllUsers} = require('../controllers/user.controller.js')


router.post('/register', verifySignup.checkDubplicateUsername, register)
router.post('/login', login)
router.post('/signout', signout)


router.get('/getAllUsers',  getAllUsers )
router.get('/getUser/:id', authJwt.verifyToken, getUser)

module.exports = router