import React from "react";

const BuscadorApi = ({
    valor,
    onChange
}) => {

    return (

        <div className="buscador-container">

            <span className="buscador-icono">
                🔍
            </span>

            <input
                className="buscador-api"
                type="text"
                placeholder="Buscar palabra..."
                value={valor}
                onChange={(e) =>
                    onChange(e.target.value)
                }
            />

        </div>

    );

};

export default BuscadorApi;
