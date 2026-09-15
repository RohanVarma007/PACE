import { useState } from 'react';
import './App.css';

import Runform from './Pages/Splits/splitd.jsx';
import ChatBot from './Components/Chat/chat.jsx';
import UserDatav from './Pages/UserData/userdatav.jsx';

import {
  Routes,
  Route,
  BrowserRouter,
  Navigate,
  Outlet
} from 'react-router-dom';

import Pointer from './Components/Cursor/pointer.jsx';
import Navigation from './Components/Navigation/nav.jsx';
import Login from './Pages/signIn/login.jsx';
import Signup from './Pages/signIn/signup.jsx';
import Coach from './Pages/Splits/coach.jsx';

function App() {
  const [loggedIn, setLoggedIn] = useState(
    localStorage.getItem('id') !== null
  );

  return (
    <BrowserRouter>
      <Routes>

        {/* Login */}
        <Route
          path="/login"
          element={<Login setLoggedIn={setLoggedIn} />}
        />

        {/* Signup */}
        <Route
          path="/signup"
          element={<Signup setLoggedIn={setLoggedIn} />}
        />

        {/* Protected Routes */}
        <Route
          element={
            loggedIn ? (
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
          <Route path="/userdata" element={<UserDatav />} />
          <Route path="/runform" element={<Runform />} />
          <Route path="/runform/:runId" element={<Coach />} />
          <Route path="/chat" element={<ChatBot />} />
        </Route>

        {/* Root */}
        <Route
          path="/"
          element={
            <Navigate
              to={loggedIn ? "/userdata" : "/login"}
              replace
            />
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;