import '../Style/Tarjeta.css'
import Tar from './Tar.jsx'
import Formulario from "../Orquestadores/Formulario.jsx"
import Home from './h.jsx'
import NotFound from './NotFound.jsx'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/h" replace />} />
        <Route path="/h" element={<Home />} />
        <Route path="/Tarjetas" element={<Tar />} />
        <Route path="/Formulario" element={<Formulario />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}
