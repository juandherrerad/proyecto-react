export default function Boton({ tipo, nombre = "button", variante = "primario", onClick }){
    return(
        <button
            type={tipo}
            className={`btn btn-${variante}`}
            onClick={onClick}
        >
            {nombre}
        </button>
    )
}
