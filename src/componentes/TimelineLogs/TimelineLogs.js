import React, { useState } from "react";
import { obtenerEndpoint, formatearFecha } from "../../utilerias/utilerias";
import "./TimelineLogs.css";

const TimelineLogs = ({ logs, seleccionado, onSelect, busqueda }) => {

    const [archivosColapsados, setArchivosColapsados] = useState({});

    const obtenerClaseStatus = (status) => {

        if (status >= 500) {
            return "status-error";
        }

        if (status >= 400) {
            return "status-warning";
        }

        return "status-ok";

    };
    const alternarArchivo = (archivo) => {

        setArchivosColapsados(prev => ({
            ...prev,
            [archivo]: !prev[archivo]
        }));

    };

    const resaltarTexto = (texto, busqueda) => {

        if (!busqueda || !texto) {
            return texto;
        }

        const regex = new RegExp(
            `(${busqueda})`,
            "gi"
        );

        return texto
            .split(regex)
            .map((parte, index) =>

                parte.toLowerCase() ===
                    busqueda.toLowerCase()

                    ? (
                        <mark
                            key={index}
                            className="texto-resaltado"
                        >
                            {parte}
                        </mark>
                    )
                    : parte

            );

    };

    return (

        <div className="contenedor-logs">

            {
                logs.map((log, index) => {

                    const fecha =
                        formatearFecha(log.fecha);

                    const mostrarSeparador =
                        index === 0 ||
                        logs[index - 1]?.archivo !== log.archivo;

                    const archivoColapsado =
                        archivosColapsados[
                        log.archivo
                        ];

                    const totalArchivo =
                        logs.filter(
                            item =>
                                item.archivo ===
                                log.archivo
                        ).length;

                    return (

                        <React.Fragment
                            key={`${log.archivo}-${index}`}
                        >

                            {
                                mostrarSeparador && (

                                    <div
                                        className="separador-archivo"
                                        onClick={() =>
                                            alternarArchivo(
                                                log.archivo
                                            )
                                        }
                                    >

                                        <div className="nombre-archivo-timeline">

                                            {
                                                archivoColapsado
                                                    ? "▶"
                                                    : "▼"
                                            }

                                            {" "}

                                            📁 {log.archivo}

                                        </div>

                                        <div className="archivo-info">
                                            {totalArchivo} registros
                                        </div>

                                    </div>

                                )
                            }

                            {
                                !archivoColapsado && (

                                    <div
                                        onClick={() =>
                                            onSelect(log)
                                        }
                                        className={
                                            seleccionado === log
                                                ? "timeline-item activo"
                                                : "timeline-item"
                                        }
                                    >

                                        <div className="timeline-header">

                                            <div>

                                                <div className="hora">
                                                    {fecha.hora}
                                                </div>

                                                <div className="fecha">
                                                    {fecha.fecha}
                                                </div>

                                            </div>

                                            <span
                                                className={`method method-${(
                                                    log.method || ""
                                                ).toLowerCase()}`}
                                            >
                                                {log.method}
                                            </span>

                                        </div>

                                        <div className="timeline-url">
                                            {
                                                resaltarTexto(
                                                    obtenerEndpoint(
                                                        log.url
                                                    ), busqueda
                                                )
                                            }
                                        </div>

                                        <div className="timeline-footer">

                                            <span
                                                className={
                                                    obtenerClaseStatus(
                                                        log.status
                                                    )
                                                }
                                            >
                                                {log.status}
                                            </span>

                                            <span className="tiempo">
                                                {log.tiempo}
                                            </span>

                                        </div>

                                    </div>

                                )
                            }

                        </React.Fragment>

                    );

                })
            }

        </div>

    );

};

export default TimelineLogs;
