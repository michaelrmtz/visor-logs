import React from "react";

import {
    obtenerEndpoint,
    formatearFecha
} from "../../utilerias/utilerias";

import "./TimelineLogs.css";

const TimelineLogs = ({
    logs,
    seleccionado,
    onSelect
}) => {

    return (
        <>
            {
                logs.map((log, index) => {

                    const fecha =
                        formatearFecha(log.fecha);

                    return (

                        <div
                            key={index}
                            onClick={() => onSelect(log)}
                            className={
                                seleccionado === log
                                    ? "timeline-item activo"
                                    : "timeline-item"
                            }
                        >

                            <div className="hora">
                                {fecha.hora}
                            </div>

                            <div className="fecha">
                                {fecha.fecha}
                            </div>

                            <div
                                className={`method method-${(
                                    log.method || ""
                                ).toLowerCase()}`}
                            >
                                {log.method}
                            </div>

                            <div className="timeline-url">
                                {
                                    obtenerEndpoint(
                                        log.url
                                    )
                                }
                            </div>

                            <div
                                className={`timeline-status ${obtenerClaseStatus(
                                    log.status
                                )}`}
                            >
                                {log.status}
                                {" • "}
                                {log.tiempo}
                            </div>

                        </div>

                    );

                })
            }
        </>
    );

};

const obtenerClaseStatus = (status) => {

    if (status >= 500) {
        return "status-500";
    }

    if (status >= 400) {
        return "status-400";
    }

    return "status-200";
};

export default TimelineLogs;
