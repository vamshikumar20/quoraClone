import './CssFolder/Post.css';
import { Avatar, Button } from '@mui/material';
import ArrowUpwardOutlinedIcon from '@mui/icons-material/ArrowUpwardOutlined';
import ArrowDownwardOutlinedIcon from '@mui/icons-material/ArrowDownwardOutlined';
import RepeatOutlinedIcon from '@mui/icons-material/RepeatOutlined';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import { useState, useEffect } from 'react';
import ReactQuill from "react-quill";
import ReactTimeAgo from 'react-time-ago';
import { useDispatch } from 'react-redux';
import { addAnswer } from '../actions/answer';
import ReactHtmlParser from 'html-react-parser';
import axios from 'axios';
import "react-quill/dist/quill.snow.css"

const Post = ({ question }) => {
    const [ModalOpen, setModalOpen] = useState(false)
    const handleClose = () => setModalOpen(false);
    const handleOpen = () => setModalOpen(true)
    const [answer, setAnswer] = useState("")
    const [newUser, setNewUser] = useState([])
    const dispatch = useDispatch()

    // console.log(question)

    function LastSeen({ date }) {
        return (
            <div>
                <ReactTimeAgo date={date} locale="en-US" timeStyle="round" />
            </div>
        )
    }

    const handleAnswer = (value) => {
        // console.log(value)
        setAnswer(value)
    }

    const handleSubmit = () => {
        if (question?._id && answer !== "") {
            dispatch(addAnswer(answer, question?._id))
            handleClose()
        }
    }
    // console.log(answer)

    const getUser = async () => {
        const res = await axios.get('https://pd-quora-clone.herokuapp.com/api/v1/auth/users')
        // console.log(res.data)
        const { users } = res.data
        const fuser = users.find(user => user._id === question.users)
        // console.log(fuser)
        setNewUser(fuser)
    }

    useEffect(() => {
        getUser()
    }, [])
    return (
        <div className='post'>
            <div className="post-info">
                <Avatar />
                <h4>{newUser?.firstName}  {newUser?.lastName}</h4>
                <small><LastSeen date={question?.date} /></small>
            </div>
            <div className="post-body">
                <div className="post-question">
                    <p>{question?.questionContent}</p>
                    <Button onClick={handleOpen} variant="outlined" size='small' className='post-btnAnswer' color='error'>Answer</Button>

                    <Modal
                        open={ModalOpen}
                        onClose={handleClose}
                        closeOnEsc
                        center
                        closeOnOverlayClick={false}
                        styles={{
                            overlay: {
                                height: "auto",
                            }
                        }}>
                        <div className="modal-question">
                            <h1>{question?.questionContent}</h1>
                            <p>Asked by {" "}<span className='name'>Username</span> on <span className='name'>{new Date(question?.date).toLocaleString()}</span></p>
                        </div>
                        <div className="modal-answer">
                            <ReactQuill placeholder='Enter your answer'
                                value={answer}
                                onChange={handleAnswer} />
                        </div>
                        <div className="p-modal-buttons">
                            <Button className='p-cancle-btn' size='small' variant="outlined" color="error" onClick={handleClose}>
                                Cancel
                            </Button>
                            <Button style={{
                                backgroundColor: "black",
                                borderRadius: "20px"
                            }} size='large' variant="contained" type='submit' className='p-add-btn'
                                onClick={handleSubmit}>Add Answer</Button>
                        </div>
                    </Modal>
                </div>
                {
                    question.questionUrl !== "" && <img src={question?.questionUrl} alt="question url" />
                }
            </div>
            <div className="post-footer">
                <div className="post-footerActions">
                    <ArrowUpwardOutlinedIcon />
                    <ArrowDownwardOutlinedIcon style={{
                        marginLeft: "30px"
                    }} />
                </div>
                <RepeatOutlinedIcon />
                <ChatBubbleOutlineOutlinedIcon />
                <div className="post-footerLeft">
                    <ShareOutlinedIcon />
                    <MoreHorizOutlinedIcon />
                </div>
            </div>
            <p style={{
                color: "rgba(0,0,0,0.5)",
                fontSize: "12px",
                fontWeight: "bold",
                margin: "10px 0"
            }}>{question?.allAnswers.length} Answers</p>
            <div style={{
                margin: "5px 0px 0px 0px",
                padding: "5px,0px,0px,20px",
                borderTop: "1px solid lightgray"
            }} className="post-answer">

                {
                    question?.allAnswers?.map(answer =>
                        <>
                            <div style={{
                                display: "flex",
                                flexDirection: "column",
                                width: "100%",
                                padding: "8px 5px",
                                borderTop: "1px solid lightgray"
                            }} className="post-answerContainer">
                                <div style={{

                                    display: "flex",
                                    alignItems: "center",
                                    // marginBottom: "0px",
                                    fontSize: "12px",
                                    fontWeight: "600",
                                    color: "#888"
                                }} className="post-answered">
                                    <Avatar />
                                    <div className="post-info">
                                        <p style={{
                                            marginLeft: "10px"
                                        }}>Username</p>
                                        <p style={{
                                            marginLeft: "10px"
                                        }}><LastSeen date={answer?.date} /></p>
                                    </div>
                                </div>
                                <div className="post-answer">
                                    {ReactHtmlParser(answer?.answerContent)}
                                </div>
                            </div>
                        </>)
                }
            </div>
        </div>
    );
}

export default Post;