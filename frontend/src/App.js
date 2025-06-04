import React from 'react'
import { Route, Routes } from 'react-router-dom'
import {UserContextProvider} from './context/userContext';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import SearchFriends from './pages/SearchFriends';

const App = () => {
  return (
    <div>
      <UserContextProvider>
        <Routes>
        <Route path='/' exact element={<Home />} />
        <Route path='/login' element={<Login />}/>
        <Route path='/signup' element={<Signup />}/>
        <Route path='/find-friends' element={<SearchFriends />} />
      </Routes>
      </UserContextProvider>
    </div>
  )
}

export default App