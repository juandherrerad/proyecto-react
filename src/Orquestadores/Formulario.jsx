import { useNavigate } from 'react-router-dom';
import Boton from "../Componentes/Formulario/Boton.jsx";
import Campos from "../Componentes/Formulario/Campos.jsx";
import "../Style/Formulario.css";

const Etiquetas = [
  { etiqueta: "Nombre", tipo: "text", holder: "Ej: Minion Kevin" },
  { etiqueta: "Imagen", tipo: "text", holder: "Ej: https://misitio.com/minion.png" },
  { etiqueta: "Descripcion", tipo: "text", holder: "Ej: Un minion alegre que reparte bananas" },
  { etiqueta: "Color", tipo: "text", holder: "Ej: #fbbf24 o amarillo" }
];

const Botones = [
  { tipo: "submit", nombre: "Enviar", variante: "primario" },
  { tipo: "button", nombre: "Volver", variante: "ghost" },
  { tipo: "reset", nombre: "Reset", variante: "sutil" }
];

export default function Formulario() {
  const navigate = useNavigate();
  const irATarjetas = () => navigate("/Tarjetas");

  return (
    <div className="form-page">
      <form className="form-card" action="">
        <header className="form-header">
          <h1 className="form-titulo">Nueva tarjeta</h1>
          <p className="form-subtitulo">Completa los datos para crear una tarjeta</p>
        </header>
        <div className="form-campos">
          {Etiquetas.map((campo) => (
            <Campos
              key={campo.etiqueta}
              etiqueta={campo.etiqueta}
              tipo={campo.tipo}
              holder={campo.holder}
            />
          ))}
        </div>
        <div className="form-acciones">
          {Botones.map((boton) => (
            <Boton
              key={boton.nombre}
              nombre={boton.nombre}
              tipo={boton.tipo}
              variante={boton.variante}
              onClick={boton.nombre === "Volver" ? irATarjetas : undefined}
            />
          ))}
        </div>
      </form>
    </div>
  );
}
