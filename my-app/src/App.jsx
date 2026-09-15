import { useState } from 'react'
import './App.css'
import Runform from './Pages/Splits/splitd.jsx'
import ChatBot from './Components/Chat/chat.jsx'
import UserDatav from './Pages/UserData/userdatav.jsx'
import { BrowserRouter as Router, Routes, Route, BrowserRouter, Navigate } from 'react-router-dom'
import Pointer from './Components/Cursor/pointer.jsx'
import Navigation from './Components/Navigation/nav.jsx'
import Login from './Pages/signIn/login.jsx'
import Signup from './Pages/signIn/signup.jsx'
import Coach from './Pages/Splits/coach.jsx'

function App() {
  const isLoggedIn = () => {
    return localStorage.getItem('id') !== null;
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/signup" element={<Signup />} />

        {/* Protected routes (with nav and cursor) */}
        <Route
          element={
            isLoggedIn() ? (
              <>
                <Navigation />
                <Pointer />
              </>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        >
          <Route exact path="/runform/:runId" element={<Coach />} />
          <Route exact path="/userdata" element={<UserDatav />} />
          <Route exact path="/runform" element={<Runform />} />
          <Route exact path="/chat" element={<ChatBot />} />
        </Route>

        {/* Redirect root to login or userdata */}
        <Route exact path="/" element={<Navigate to={isLoggedIn() ? "/userdata" : "/login"} replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
