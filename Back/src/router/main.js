const express = require('express')
const router = express.Router()
const { login , register, signout} = require('../controllers/auth.controller')
const verifySignup = require('../middleware/verify.signup')
const  authJwt = require('../middleware/authJwt.js')
const { getUser, getAllUsers} = require('../controllers/user.controller.js')
const { updateUsername, updatePassword, updatePhoto } = require('../controllers/update.controller')
const { createConverastion, allConversations, getChat, sendMessage, likeMessage, deleteConversation } = require('../controllers/conversations.controller')

// AUTH ROUTES
router.post('/register', verifySignup.checkDubplicateUsername, register)
router.post('/login', login)
router.post('/signout', signout)

// USERS ROUTES
router.get('/getAllUsers',  getAllUsers )
router.get('/getUser/:id', getUser)

// UPDATE USERS ROUTES
router.patch('/updateUsername/:id', verifySignup.checkDubplicateUsername, updateUsername )
router.patch('/updatePassword/:id', updatePassword)
router.patch('/updatePhoto/:id', updatePhoto)

// CONVERASTIONS ROUTES
router.post('/newConversation', createConverastion)
router.post('/getConversations',  allConversations)
router.get('/chat/:id', getChat)
router.post('/sendMessage',  sendMessage)
router.get('/like/:id/:index', likeMessage)
router.delete('/deleteConversation/:id', deleteConversation)

module.exports = router