const mongoose = require('mongoose')


const userSchema = new mongoose.Schema(
    {
    participants: {
        type: Array,
        required: true
    },

    messages: {
        type: Array,
        required: true
    }
    },
    {
        collection: 'Conversations'
    }
)

module.exports  = mongoose.model('Conversations', userSchema)