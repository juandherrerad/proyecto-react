import { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Desintegracion from "../Componentes/Home/Desintegracion.jsx";
import ABC from "../img/pedomelo.gif";
import "../Style/Home.css";

const TEXTO = "WELCOME";
const RETRASO = 2800;

export default function Home(){
    const navigate = useNavigate();
    const irATarjetas = useCallback(() => navigate("/Tarjetas"), [navigate]);
    const [letrasVisibles, setLetrasVisibles] = useState(0);
    const [desintegrando, setDesintegrando] = useState(false);

    // 4. Typewriter letra por letra
    useEffect(() => {
        if (letrasVisibles >= TEXTO.length) return;
        const id = setTimeout(() => setLetrasVisibles(v => v + 1), 220);
        return () => clearTimeout(id);
    }, [letrasVisibles]);

    const empezarDesintegracion = useCallback(() => setDesintegrando(true), []);

    const subtituloVisible = letrasVisibles >= TEXTO.length;

    return (
        <div className="Home">
            <div className={`home-contenido${desintegrando ? ' desintegrando' : ''}`}>
                {/* 4. WELCOME typewriter */}
                <h1 className="home-welcome" aria-label="WELCOME">
                    {TEXTO.split('').map((letra, i) => (
                        <span
                            key={i}
                            className={`letra${i < letrasVisibles ? ' visible' : ''}`}
                            style={{ '--i': i }}
                        >
                            {letra}
                        </span>
                    ))}
                    <span className="cursor" aria-hidden="true">|</span>
                </h1>

                {/* 1. Subtítulo con fade-in */}
                <p className={`home-sub${subtituloVisible ? ' visible' : ''}`}>
                    to my cards collection
                </p>

                {/* 5. El gif se desintegra y el texto lo acompaña (clase .desintegrando) */}
                <div className="home-gif">
                    <Desintegracion
                        src={ABC}
                        retraso={RETRASO}
                        duracion={1000}
                        paso={2}
                        onFin={irATarjetas}
                        onInicio={empezarDesintegracion}
                    />
                </div>
            </div>
        </div>
    )
}
