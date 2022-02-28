import './CssFolder/WidgetContent.css';
import { Avatar } from '@mui/material';

const WidgetContent = () => {
    return (
        <div className="widget-contents">
            <div className="widget-content">
                <Avatar style={{
                    margin: "25px 0 0 0"
                }} alt="Remy Sharp" src="https://images.unsplash.com/photo-1541577141970-eebc83ebe30e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1287&q=80" />
                <div className="widget-contentTitle">
                    <h5>Mobile App Programmer</h5>
                    <p>The best mobile app development company</p>
                </div>
            </div>
        </div>
    );
}

export default WidgetContent;