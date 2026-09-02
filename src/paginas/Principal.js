import React, { useState } from "react";

import CargadorLog from "../componentes/CargadorLog/CargadorLog";
import BuscadorApi from "../componentes/BuscadorApi/BuscadorApi";
import TimelineLogs from "../componentes/TimelineLogs/TimelineLogs";
import DetalleApi from "../componentes/DetalleApi/DetalleApi";

import './principal.css';

const Principal = () => {

    const [busqueda, setBusqueda] = useState("");
    const [seleccionado, setSeleccionado] = useState(null);
    const [logs, setLogs] = useState([]);
    const [nombreArchivo, setNombreArchivo] = useState("");

    const logsFiltrados = logs.filter((log) => {

        const textoBusqueda = JSON.stringify({
            fecha: log.fecha,
            method: log.method,
            url: log.url,
            status: log.status,
            headers: log.headers || {},
            request: log.request || {},
            response: log.response || {}
        }).toLowerCase();

        return textoBusqueda.includes(
            busqueda.toLowerCase()
        );

    });

    return (

        <div className="contenedor-principal">

            <section className="barra-superior">

                <CargadorLog
                    onLoad={(logsCargados) => {
                        setLogs(logsCargados);
                        setSeleccionado(null);
                    }}
                />

                <BuscadorApi
                    valor={busqueda}
                    onChange={setBusqueda}
                />

                <div className="total-registros">
                    {logs.length} registros
                </div>

            </section>

            {
                nombreArchivo && (<div className="nombre-archivo">
                    {nombreArchivo}
                </div>)
            }

            <section className="contenido">

                <div className="timeline">

                    <TimelineLogs
                        logs={logsFiltrados}
                        seleccionado={seleccionado}
                        onSelect={setSeleccionado}
                    />

                </div>

                <div className="detalle">

                    <DetalleApi
                        api={seleccionado}
                    />

                </div>

            </section>

        </div>

    );
};

export default Principal;
