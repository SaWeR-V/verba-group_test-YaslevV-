import './App.css'
import { TodoPage } from './components/TodoPage.tsx'
import { AuthPage } from './components/AuthPage.jsx'
import { Routes, Route, useNavigate } from 'react-router'
import { useEffect } from 'react'

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('ToDo_auhorized') !== 'admin') {
      navigate('/login'); 
    }
  }, [navigate]);

  return (
    <Routes>
      <Route path='/login' element={<AuthPage />}/>
      <Route path='/' element={<TodoPage />} />
    </Routes>
  )
}

export default App