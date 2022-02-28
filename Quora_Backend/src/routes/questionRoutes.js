import express from "express";
import Question from "../services/mongodb/models/Question";
import Answer from "../services/mongodb/models/Answer";
import { body, validationResult } from "express-validator";


const router = express.Router()

/*
type : GET REQUEST
path : /api/v1/question/all
query - params : none
isProtected : false 
*/

router.get('/all', async (req, res) => {
    try {
        // const question = await Question.find({}).populate('answers')
        const question = await Question.aggregate([
            {
                $lookup: {
                    from: "answers",
                    localField: "_id",
                    foreignField: "question",
                    as: "allAnswers"
                }
            }
            // {
            //     $lookup: {
            //         from: "users",
            //         localField: "_id",
            //         foreignField: "question",
            //         as: "user"
            //     }
            // }
        ])
        res.status(200).json({ question, message: "Successfully fetched question" })
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ question: [], message: "Error fetching questions" })
    }
})

/*
type : POST REQUEST
path : /api/v1/question/add
query - params : none
isProtected : false 
*/

router.post('/add',
    body('questionContent').isLength({ min: 3 }),
    // body('date').trim().isDate(),
    // body('users').isLength({ min: 1 }),

    async (req, res) => {
        // console.log(req.body)
        const { errors } = validationResult(req)

        if (errors.length > 0) return res.status(403).json({ errors, message: "BAD REQUEST , VALIDATION FAILED" })

        try {
            const question = new Question(req.body)
            await question.save()
            res.status(201).json({ question, message: "Successfully added a question" })
        } catch (error) {
            console.log(error.message)
            res.status(500).json({ question: null, message: "Error adding question" })
        }
    })
export default router