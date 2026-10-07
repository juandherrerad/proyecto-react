export default function Campos({etiqueta, tipo, holder}){
    return(
        <div className="form-campo">
            <label htmlFor={etiqueta}>{etiqueta}</label>
            <input id={etiqueta} name={etiqueta} type={tipo} placeholder={holder} />
        </div>
    )
}
