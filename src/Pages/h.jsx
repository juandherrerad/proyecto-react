import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import Desintegracion from "../Componentes/Home/Desintegracion.jsx";
import ABC from "../img/pedomelo.gif";
import "../Style/Home.css";

export default function Home(){
    const navigate = useNavigate();
    const irATarjetas = useCallback(() => navigate("/Tarjetas"), [navigate]);

    return (
        <div className="Home">
            <Desintegracion
                src={ABC}
                retraso={2500}
                duracion={1000}
                paso={2}
                onFin={irATarjetas}
            />
        </div>
    )
}
