const mongoose = require('mongoose')

const Posts = new mongoose.Schema(
    {
        user: {
            type: String,
        },
        comments: {
            type: [String]
        },
        userEmail: {
            type: String
        }
    },
    {
        versionKey: false,
    }
)

module.exports = mongoose.model('Posts', Posts, 'Posts');
