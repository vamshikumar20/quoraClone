import FeedBox from "./FeedBox";
import Post from "./Post";
import './CssFolder/Feed.css';
import axios from "axios";
import { useEffect, useState } from "react";
// import { useDispatch } from "react-redux";

const Feed = () => {
    const [questions, setQuestions] = useState([])
    // const dispatch = useDispatch()
    const getQuestions = async () => {
        const res = await axios.get('https://pd-quora-clone.herokuapp.com/api/v1/question/all')
        // console.log(res.data.question.reverse())
        const { question } = res.data
        setQuestions(question.reverse())
        // dispatch({
        //     type: "GET_QUESTIONS",
        //     payload: { questions }
        // })
    }
    useEffect(() => {
        getQuestions()
    }, [])
    return (
        <div className="feed">
            <FeedBox />
            {
                questions.map((question) => <Post question={question} />)
            }
            {/* <Post /> */}
        </div>

    );
}

export default Feed;