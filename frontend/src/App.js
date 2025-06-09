import React from 'react'
import { Route, Routes } from 'react-router-dom'
import {UserContextProvider} from './context/userContext';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import SearchFriends from './pages/SearchFriends';
import ContactPage from "./pages/Contact";
import FaqsPage from "./pages/Faqpage";
import ProfilePage from './pages/ProfilePage';

const App = () => {
  return (
    <div>
      <UserContextProvider>
        <Routes>
        <Route path='/' exact element={<Home />} />
        <Route path='/login' element={<Login />}/>
        <Route path='/signup' element={<Signup />}/>
        <Route path='/find-friends' element={<SearchFriends />} />
        <Route path='/contact' element={<ContactPage />} />
        <Route path='/faqs' element={<FaqsPage />} />
        <Route path='/my-profile' element={<ProfilePage />} />
      </Routes>
      </UserContextProvider>
    </div>
  )
}

export default App