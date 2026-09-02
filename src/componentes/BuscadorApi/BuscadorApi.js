import React from "react";

const BuscadorApi = ({ valor, onChange }) => {

    return (
        <input
            type="text"
            placeholder="Buscar API..."
            value={valor}
            onChange={(e) => onChange(e.target.value)}
        />
    );

};

export default BuscadorApi;
