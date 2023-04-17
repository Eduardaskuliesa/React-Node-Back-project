const userDb =  require('../schemas/userSchema')
const conversationDb = require('../schemas/converastionSchema')


const createConverastion = async(req, res) => {
    const { from, to} = req.body

    const convoExists = await conversationDb.findOne({ participants: {$all: [from, to]}})

    if (convoExists) return res.send({ success: true })

    const newConv = new conversationDb({
        participants: [from, to],
        messages: []
    })

    await newConv.save()

    res.send({ success: true})
}

const allConversations = async (req, res) => {
    const {username} = req.body

    const conversations = await conversationDb.find({participants: {$all: [username]}})

    res.send({success: true, conversations})

}
const getChat = async (req, res) => {
    const {id} = req.params
    const conversation = await conversationDb.findOne({_id: id})
    res.send({success: true, conversation})
}

const sendMessage = async (req, res) => {
    const {id, username, message} = req.body

    const newMessage = {
        username,
        message,
        time: Date.now(),
        likes: 0
    }

    const conversation = await conversationDb.findOneAndUpdate(
        {_id: id},
        {$push: {messages: newMessage}},
        {new: true}
    )

    res.send({success: true, conversation})
}

const likeMessage = async (req, res) => {
    const {id, index} = req.params

    const conv = await conversationDb.findOne({_id: id})

    const messages = conv.messages
    messages[index].likes++

    const conversation = await conversationDb.findOneAndUpdate({_id: id}, {$set: {messages}}, {new: true})

    res.send({success: true, conversation})
}

const deleteConversation = async (req, res) =>{
    const {id} = req.params

    const findOne = await conversationDb.findOne(({_id: id}))
    if(!findOne) return res.status(404).send({message: 'Wrong Id'})

    const deleteConv = await conversationDb.findOneAndDelete({_id: id}, {new: true})

    res.send({ success: true, message: 'Your Conversation was successfull deleted'})
}


module.exports ={
    createConverastion,
    allConversations,
    getChat,
    likeMessage,
    sendMessage,
    deleteConversation
}
