import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import LoginPage from './pages/LoginPage'
import MainPage from './pages/MainPage'
import CategoryPage from './pages/CategoryPage'
import CategoryFormPage from './pages/CategoryFormPage'
import UsersPage from './pages/UsersPage'
import UsersFormPage from './pages/UsersFormPage'
import UserContentPage from './pages/UserContentPage'
import CategoryContentPage from './pages/CategoryContentPage'
import ProductFormPage from './pages/ProductFormPage'

import NavBar from './components/NavBar'

function App() { 

  return (
    <div className='content'>
      <BrowserRouter>
        <NavBar />
        <Routes>   
          <Route path="/" element={<MainPage />} />     
          <Route path="/login" element={<LoginPage />} />
          <Route path="/categories" element={<CategoryPage />} />
          <Route path="/categories/:id/:name" element={<CategoryContentPage />} />
          <Route path="/new-category" element={<CategoryFormPage />} />     
          <Route path="/new-product/:id/:category" element={<ProductFormPage />} />
          <Route path="/users" element={<UsersPage />} />  
          <Route path="/users/:id" element={<UserContentPage />} />
          <Route path="/new-user/:kind" element={<UsersFormPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
