import React, { useState } from "react";

import CargadorLog from "../componentes/CargadorLog/CargadorLog";
import BuscadorApi from "../componentes/BuscadorApi/BuscadorApi";
import TimelineLogs from "../componentes/TimelineLogs/TimelineLogs";
import DetalleApi from "../componentes/DetalleApi/DetalleApi";

import "./principal.css";

const Principal = () => {

    const [busqueda, setBusqueda] = useState("");
    const [seleccionado, setSeleccionado] = useState(null);
    const [logs, setLogs] = useState([]);
    const [filtroStatus, setFiltroStatus] = useState("todos");

    const totalRegistros = logs.length;

    const exitosos = logs.filter(log => log.status >= 200 && log.status < 400).length;

    const warnings = logs.filter(log => log.status >= 400 && log.status < 500).length;

    const errores = logs.filter(log => log.status >= 500).length;

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

        const coincideBusqueda =
            textoBusqueda.includes(
                busqueda.toLowerCase()
            );

        let coincideStatus = true;

        switch (filtroStatus) {

            case "success":
                coincideStatus =
                    log.status >= 200 &&
                    log.status < 400;
                break;

            case "warning":
                coincideStatus =
                    log.status >= 400 &&
                    log.status < 500;
                break;

            case "error":
                coincideStatus =
                    log.status >= 500;
                break;

            default:
                coincideStatus = true;

        }

        return (
            coincideBusqueda &&
            coincideStatus
        );

    });

    return (

        <div className="contenedor-principal">

            <section className="barra-superior">

                <CargadorLog
                    onLoad={(logsCargados) => {
                        const logsOrdenados =
                            [...logsCargados].sort(
                                (a, b) =>
                                    new Date(a.fecha) -
                                    new Date(b.fecha)
                            );
                        setLogs(logsOrdenados);
                        setSeleccionado(null);
                    }}
                />

                <BuscadorApi
                    valor={busqueda}
                    onChange={setBusqueda}
                />

                <button
                    className={`metrica total ${filtroStatus === "todos"
                        ? "activa"
                        : ""
                        }`}
                    onClick={() =>
                        setFiltroStatus("todos")
                    }
                >
                    {totalRegistros} peticiones totales
                </button>

                <button
                    className={`metrica success ${filtroStatus === "success"
                        ? "activa"
                        : ""
                        }`}
                    onClick={() =>
                        setFiltroStatus("success")
                    }
                >
                    {exitosos} peticiones exitosas HTTP 2xx
                </button>

                <button
                    className={`metrica warning ${filtroStatus === "warning"
                        ? "activa"
                        : ""
                        }`}
                    onClick={() =>
                        setFiltroStatus("warning")
                    }
                >
                    {warnings} peticiones con errores HTTP 4xx
                </button>

                <button
                    className={`metrica error ${filtroStatus === "error"
                        ? "activa"
                        : ""
                        }`}
                    onClick={() =>
                        setFiltroStatus("error")
                    }
                >
                    {errores} peticiones con errores HTTP 5xx
                </button>


            </section>

            <section className="contenido">

                <div className="timeline">

                    <TimelineLogs
                        logs={logsFiltrados}
                        seleccionado={seleccionado}
                        onSelect={setSeleccionado}
                        busqueda={busqueda}
                    />

                </div>

                <div className="detalle">

                    <DetalleApi
                        api={seleccionado}
                        busqueda={busqueda}
                    />

                </div>

            </section>

        </div>

    );

};

export default Principal;
