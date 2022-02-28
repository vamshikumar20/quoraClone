import Navbar from "./layouts/Navbar";
import Sidebar from "./Sidebar";
import Feed from "./Feed";
import Widget from "./Widget";
import { Navigate } from 'react-router';
import { useSelector } from "react-redux";

import './CssFolder/Quora.css'

const Quora = () => {

    const { token } = useSelector(state => state.authReducer)

    return token === null ? <Navigate to='/' /> : <div className="quora">
        <Navbar />
        <div className="quora-contents">
            <div className="quora-content">
                <Sidebar />
                <Feed />
                <Widget />
            </div>
        </div>
    </div>
}

export default Quora;