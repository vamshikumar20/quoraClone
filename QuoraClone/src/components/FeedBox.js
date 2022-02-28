import { Avatar } from '@mui/material';
import './CssFolder/FeedBox.css';


const FeedBox = () => {
    return (
        <div className="feedBox">
            <div className="feedBox-info">
                <Avatar />
            </div>
            <div className="feedBox-quora">
                <h5>What is your question ?</h5>
            </div>
        </div>
    );
}

export default FeedBox;