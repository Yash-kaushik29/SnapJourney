import React from 'react'
import { Route, Routes } from 'react-router-dom'
import {UserContextProvider} from './context/userContext';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';

const App = () => {
  return (
    <div>
      <UserContextProvider>
        <Routes>
        <Route path='/' exact element={<Home />} />
        <Route path='/login' element={<Login />}/>
        <Route path='/signup' element={<Signup />}/>
      </Routes>
      </UserContextProvider>
    </div>
  )
}

export default App