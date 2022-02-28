import toast from 'react-hot-toast'
import axios from 'axios'

export const signupUser = (email, firstName, lastName, password) => async (dispatch) => {

    try {
        const base_Url = 'https://pd-quora-clone.herokuapp.com'
        const res = await axios.post(`${base_Url}/api/v1/auth/signup`, {
            email, firstName, lastName, password
        })
        // console.log(res.data)

        const { user } = res.data
        if (user) {
            toast.success("SIGNUP SUCCESS")
            dispatch({
                type: "SIGNUP_SUCCESS",
                payload: { signup: true }
            })
        } else {
            toast.error("SIGNUP FAILED")
            dispatch({
                type: "SIGNUP_FAILED",
                payload: { signup: false }
            })
        }
    } catch (error) {
        // console.log(error.message)
        toast.error(error.message)
    }
};

export const loginUser = (email, password) => async (dispatch) => {

    try {
        const base_Url = 'https://pd-quora-clone.herokuapp.com'
        const res = await axios.post(`${base_Url}/api/v1/auth/login`, {
            email, password
        })
        console.log(res.data)
        const { token, message } = res.data
        if (token) {
            toast.success("Login Success !")

            //save token to the local storage
            localStorage.setItem('token', token)

            dispatch({
                type: "LOGIN_SUCCESS",
                payload: { token }
            })
        } else {
            toast.error(message)
            dispatch({
                type: "LOGIN_FAILED",
                payload: { token: null }
            })
        }
    } catch (error) {
        console.log(error.message)
        toast.error(error.message)
    }
};

export const logoutUser = () => async (dispatch) => {

    try {
        // const token = localStorage.getItem(token)
        // if (token) {
        toast.success("Logout Success !")

        //remove token from the local storage
        localStorage.setItem("token", null)

        dispatch({
            type: "LOGOUT_SUCCESS",
            // payload: { token:null }
        })
        // } else {
        //     toast.error(message)
        //     dispatch({
        //         type: "LOGOUT_FAILED",
        //         payload: { token: null }
        //     })
        // }
    } catch (error) {
        // console.log(error.message)
        toast.error(error.message)
    }
};
