import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import LoginPage from './pages/LoginPage'
import MainPage from './pages/MainPage'

import NavBar from './components/NavBar'

function App() { 

  return (
    <BrowserRouter>
      <NavBar />
      <Routes>   
        <Route path="/" element={<MainPage />} />     
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
