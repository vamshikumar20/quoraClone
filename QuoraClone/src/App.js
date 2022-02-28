import './App.css';
import Quora from './components/Quora';
import Login from './components/Auth/Login';
import SignUp from './components/Auth/Signup';
import { Toaster } from 'react-hot-toast';
import { Routes, Route } from "react-router-dom";
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

function App() {

  const dispatch = useDispatch()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token === 'null') {
      //dispatch an action that modifies the store
      // console.log(token)
      dispatch({
        type: "SET_AUTH_TOKEN",
        payload: { token: null }
      })
    }
    else {
      dispatch({
        type: "SET_AUTH_TOKEN",
        payload: { token }
      })
    }
  }, [])

  return (
    <div className="App">
      <div><Toaster /></div>
      {/* <Quora /> */}
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/quora' element={<Quora />} />
      </Routes>
    </div>
  );
}

export default App;
