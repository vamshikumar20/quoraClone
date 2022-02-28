import toast from 'react-hot-toast'
import axios from 'axios'

export const addAnswer = (answerContent, question) => async (dispatch) => {

    try {
        const base_Url = 'https://pd-quora-clone.herokuapp.com'
        const res = await axios.post(`${base_Url}/api/v1/answer/add`, {
            answerContent, question
        })
        // console.log(res.data)
        const { answer, message } = res.data
        function refresh() {
            window.location.href = '/';
            console.log("done")
        }
        if (answer) {
            toast.success(message)
            setTimeout(refresh, 2000)
            // window.location.href = '/';
            dispatch({
                type: "ADD_ANSWER",
                payload: { answer }
            })
        } else {
            toast.error(message)
            dispatch({
                type: "ADD_ANSWER_FAILED"
            })
        }
    } catch (error) {
        // console.log(error.message)
        toast.error(error.message)
    }
};