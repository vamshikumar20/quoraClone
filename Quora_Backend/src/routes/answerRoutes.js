import express from "express";
import Answer from "../services/mongodb/models/Answer";
import Question from "../services/mongodb/models/Question";
import { body, validationResult } from "express-validator";


const router = express.Router()

/*
type : GET REQUEST
path : /api/v1/answer/all
query - params : none
isProtected : false 
*/

router.get('/all', async (req, res) => {
    try {
        const answer = await Answer.find({})//.populate('question')
        res.status(200).json({ answer, message: "Successfully fetched answers" })
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ message: "error from answer routes" })
    }
})

/*
type : POST REQUEST
path : /api/v1/answer/add
query - params : none
isProtected : false 
*/

router.post('/add',
    body('answerContent').isLength({ min: 3 }),
    body("question").isLength({ min: 5 }),
    // body('date').trim().isDate(),
    // body('users').isLength({ min: 1 }),

    async (req, res) => {
        // console.log(req.body)
        const { errors } = validationResult(req)

        if (errors.length > 0) return res.status(403).json({ errors, message: "BAD REQUEST , VALIDATION FAILED" })

        try {
            const question = await Question.findById(req.body.question)
            if (!question) return res.status(300).json({ answer: null, message: "Invalid question" })
            const answer = new Answer(req.body)
            await answer.save()
            res.status(201).json({ answer, message: "Answer added successfully" })
        } catch (error) {
            console.log(error.message)
            res.status(500).json({ answer: null, message: "Error adding answer" })
        }
    })

export default router