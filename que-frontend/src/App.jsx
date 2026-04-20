import './App.css'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import Status from './pages/Status'
import Admin from './pages/Admin'
import Display from './pages/Display'
import { Outlet } from 'react-router-dom'

function AppLayout() {
  return (
    <>
      <main style={{ flexGrow: 1 }}>
        <Outlet />
      </main>
    </>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/status/:id" element={<Status />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/display" element={<Display />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
