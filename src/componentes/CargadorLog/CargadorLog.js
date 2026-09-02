import React from "react";
import { parsearLog } from "../../servicios/parserLog";

const CargadorLog = ({ onLoad }) => {

    const cargarArchivo = async ({ target }) => {
        const archivo = target.files[0];

        if (!archivo) {
            return;
        }

        const contenido = await archivo.text();

        const resultado = parsearLog(contenido);

        onLoad(resultado);
    };

    return (
        <input
            type="file"
            accept=".log,.txt"
            onChange={cargarArchivo}
        />
    );
};

export default CargadorLog;
