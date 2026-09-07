import { useState } from 'react'
import './App.css'
import Runform from './Components/Splits/splitd.jsx'
import ChatBot from './Components/Chat/chat.jsx'
import UserDatav from './Pages/UserData/userdatav.jsx'
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom'
import Pointer from './Components/Cursor/pointer.jsx'
function App() {

  return (
      <BrowserRouter>
      <Routes>
        <Route element={<Pointer />}>
          <Route exact path="/runform" element={<Runform />} />
          <Route exact path="/chat" element={<ChatBot />} />
          <Route exact path="/userdata" element={<UserDatav />} />
        </Route>
      </Routes>
      </BrowserRouter>
  )
}

export default App
