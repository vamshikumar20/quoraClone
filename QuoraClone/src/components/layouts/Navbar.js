import HomeIcon from '@mui/icons-material/Home';
import FeaturedPlayListOutlinedIcon from '@mui/icons-material/FeaturedPlayListOutlined';
import AssignmentTurnedInOutlinedIcon from '@mui/icons-material/AssignmentTurnedInOutlined';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';
import SearchIcon from '@mui/icons-material/Search';
import { Avatar, Button } from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import Input from '@mui/material/Input';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
// import CloseIcon from '@mui/icons-material/Close';
// // import { borders } from '@mui/system';
import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addQuestion } from '../../actions/questions';
import { logoutUser } from '../../actions/auth';
import '../CssFolder/Quora-Navbar.css';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};



const Navbar = () => {
    const [inputUrl, setinputUrl] = useState("")
    const [ModalOpen, setModalOpen] = useState(false)
    const [question, setQuestion] = useState("");
    const handleClose = () => setModalOpen(false);
    const handleOpen = () => setModalOpen(true);
    const dispatch = useDispatch()
    const [open, setOpen] = useState(false);
    const handleOpenProfileModel = () => setOpen(true);
    const handleCloseProfileModel = () => setOpen(false);

    const Search = styled('div')(({ theme }) => ({
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: alpha(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: 'auto',
        },
    }));

    const SearchIconWrapper = styled('div')(({ theme }) => ({
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    }));

    const StyledInputBase = styled(InputBase)(({ theme }) => ({
        color: 'inherit',
        '& .MuiInputBase-input': {
            padding: theme.spacing(1, 1, 1, 0),
            // vertical padding + font size from searchIcon
            paddingLeft: `calc(1em + ${theme.spacing(4)})`,
            transition: theme.transitions.create('width'),
            width: '100%',
            [theme.breakpoints.up('sm')]: {
                width: '12ch',
                '&:focus': {
                    width: '20ch',
                },
            },
        },
    }));

    const handleSubmit = () => {
        dispatch(addQuestion(question, inputUrl))
        handleClose()
    }

    const handleLogout = () => {
        dispatch(logoutUser())
    }

    // const ariaLabel = { 'aria-label': 'description' };
    return (
        <div className="qnavbar">
            <div className="qnavbar-content">
                <div className="qnavbar-logo">
                    {/* <img src="https://video-public.canva.com/VAD8lt3jPyI/v/ec7205f25c.gif" alt="logo" /> */}
                    <img src="https://img.icons8.com/external-icongeek26-glyph-icongeek26/64/000000/external-chat-alert-icongeek26-glyph-icongeek26.png" alt='logo' />
                </div>
                <div className="qnavbar-icons">
                    <div className="qnavbar-icon"><HomeIcon /></div>
                    <div className="qnavbar-icon"><FeaturedPlayListOutlinedIcon /></div>
                    <div className="qnavbar-icon"><AssignmentTurnedInOutlinedIcon /></div>
                    <div className="qnavbar-icon"><PeopleAltOutlinedIcon /></div>
                    <div className="qnavbar-icon"><NotificationsOutlinedIcon /></div>
                </div>

                {/* <div className="qnavbar-input">
                    <SearchIcon />
                    <input type="text" placeholder='Search Questions' />
                </div> */}
                <Search className="qnavbar-input">
                    <SearchIconWrapper>
                        <SearchIcon />
                    </SearchIconWrapper>
                    <StyledInputBase
                        placeholder="Search…"
                        inputProps={{ 'aria-label': 'search' }}
                    />
                </Search>

                <div className="qnavbar-profileImg">
                    <Avatar onClick={handleOpenProfileModel} />
                </div>
                <Button className='qnavbar-profileImg-btn' onClick={handleOpen} variant='contained' sx={{ borderRadius: 16, bgcolor: 'error.main' }}>Add Question</Button>

                <Modal open={ModalOpen} onClose={handleClose} closeOnEsc center closeOnOverlayClick={false} styles={{
                    overlay: {
                        height: "auto",
                    }
                }}>
                    <div className="modal-title">
                        <h5>Add Question</h5>
                        <h5>Share Link</h5>
                    </div>
                    <div className="modal-info">
                        <Avatar className='avatar' />
                        <div className="modal-scope">
                            <PeopleAltOutlinedIcon />
                            <p>Public</p>
                            <ExpandMoreOutlinedIcon />
                        </div>
                    </div>
                    <div className="modal-field">
                        <Input type='text' placeholder="Write Your Question here"
                            value={question}
                            onChange={(e) => setQuestion(e.target.value)}
                        />
                        <div style={{
                            display: "flex",
                            flexDirection: "column"
                        }}>
                            <Input type='text' value={inputUrl}
                                onChange={(e) => setinputUrl(e.target.value)}
                                placeholder='Optional: include a link that gives context' style={{
                                    margin: "5px 0",
                                    padding: "10px"
                                }} />

                            {inputUrl !== "" && <img src={inputUrl} alt="content from url" style={{
                                height: "40vh",
                                objectFit: "contain"
                            }} />}
                        </div>
                    </div>
                    <div className="modal-buttons">
                        <Button className='cancle-btn' size='small' variant="outlined" color="error" onClick={handleClose}>
                            Cancel
                        </Button>
                        <Button onClick={handleSubmit} style={{
                            backgroundColor: "black",
                            borderRadius: "20px"
                        }} size='large' variant="contained" type='submit' className='add-btn'>Add Question</Button>
                    </div>
                </Modal>

                <Modal
                    open={open}
                    onClose={handleCloseProfileModel}
                >
                    <Box sx={style}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            <h4 style={{ fontSize: "30px", color: "red" }}>Do you really want to Logout ?</h4>
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                            <Button variant="contained" color="success" style={{ marginRight: "20px" }} onClick={handleLogout}>
                                LOGOUT
                            </Button>
                            <Button variant="outlined" color="error" onClick={handleCloseProfileModel}>
                                CANCLE
                            </Button>
                        </Typography>
                    </Box>
                </Modal>
            </div>

        </div>
    );

}
export default Navbar;


