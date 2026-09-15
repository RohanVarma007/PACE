import { useState } from 'react'
import './App.css'
import Runform from './Pages/Splits/splitd.jsx'
import ChatBot from './Components/Chat/chat.jsx'
import UserDatav from './Pages/UserData/userdatav.jsx'
import { BrowserRouter as Router, Routes, Route, BrowserRouter, Navigate, Outlet} from 'react-router-dom'
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
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route
          element={
            isLoggedIn() ? (
              <>
                <Navigation />
                <Pointer />
                <Outlet />
              </>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        >
          <Route path="/runform/:runId" element={<Coach />} />
          <Route path="/userdata" element={<UserDatav />} />
          <Route path="/runform" element={<Runform />} />
          <Route path="/chat" element={<ChatBot />} />
        </Route>

        <Route
          path="/"
          element={
            <Navigate
              to={isLoggedIn() ? "/userdata" : "/login"}
              replace
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
