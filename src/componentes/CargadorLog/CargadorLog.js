import React from "react";
import { parsearLog } from "../../servicios/parserLog";

const CargadorLog = ({ onLoad }) => {

    // const cargarArchivo = async ({ target }) => {
    //     const archivo = target.files[0];

    //     if (!archivo) {
    //         return;
    //     }

    //     const contenido = await archivo.text();

    //     const resultado = parsearLog(contenido);

    //     onLoad(resultado);
    // };

    const cargarArchivo = async ({ target }) => {

        const archivos = Array.from(target.files);

        if (!archivos.length) {
            return;
        }

        const todosLosLogs = [];

        for (const archivo of archivos) {

            const contenido = await archivo.text();

            const resultado = parsearLog(
                contenido,
                archivo.name
            );

            todosLosLogs.push(...resultado);

        }

        onLoad(todosLosLogs);

    };

    return (
        <input
            type="file"
            accept=".log,.txt"
            multiple
            onChange={cargarArchivo}
        />
    );
};

export default CargadorLog;
