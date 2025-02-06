import { Route, Router, Routes } from 'react-router-dom'
import './App.css'
import Login from './pages/Login'
import Layout from './pages/Layout'
import Chat from './pages/Chat'
import ProtectedRoute from './components/Protected'

function App() {

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path='/' element={<Login />} />
        <Route element={<ProtectedRoute />}>
          <Route path ='/chat' element={<Chat />} />
        </Route>
      </Route>
    </Routes>
  )
}

export default App
