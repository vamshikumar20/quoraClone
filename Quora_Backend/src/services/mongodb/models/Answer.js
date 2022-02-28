import mongoose from "mongoose";

const AnswerSchema = new mongoose.Schema({
    answerContent: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now()
    },
    question: {
        type: mongoose.Types.ObjectId,
        ref: 'Question'
    },
    users: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    likes: [
        {
            type: String
        }
    ]
})

const Answer = mongoose.model("Answers", AnswerSchema)

export default Answer


















// (1) Store the user ids of those, who liked on the product itself and keep track of the number of likes via likes.length

// // Product in database
//     {
//         likes: [
//             'userId1',
//             'userId2',
//             'userId3',
//             ...
//         ],
//         ...
//     }