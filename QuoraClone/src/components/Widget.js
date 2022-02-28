import WidgetContent from "./WidgetContent";
import './CssFolder/Widget.css'

const Widget = () => {
    return (
        <div className="widget">
            <div className="widget-header">
                <h5>Space to follow</h5>
            </div>
            <div className="widget-contents">
                <WidgetContent />
            </div>
        </div>

    );
}

export default Widget;