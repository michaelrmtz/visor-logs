import React, { useState } from "react";
import './detalle-api.css';
const DetalleApi = ({ api }) => {

    const [tabActiva, setTabActiva] = useState("info");

    if (!api) {
        return (
            <div>
                Selecciona una petición.
            </div>
        );
    }

    const obtenerContenido = () => {

        switch (tabActiva) {

            case "headers":
                return api.headers;

            case "request":
                return api.request;

            case "response":
                return api.response;

            default:
                return {
                    fecha: api.fecha,
                    metodo: api.method,
                    status: api.status,
                    tiempo: api.tiempo,
                    url: api.url
                };
        }

    };

    return (

        <div className="detalle-card">

            <h2>
                {api.method}
            </h2>

            <p>
                {api.url}
            </p>

            <p>
                Status: {api.status}
            </p>

            <p>
                Tiempo: {api.tiempo}
            </p>

            <p>
                Fecha: {api.fecha}
            </p>

<div>

    <button
        onClick={() => setTabActiva("info")}
    >
        Info
    </button>

    <button
        onClick={() => setTabActiva("headers")}
    >
        Headers
    </button>

    <button
        onClick={() => setTabActiva("request")}
    >
        Request
    </button>

    <button
        onClick={() => setTabActiva("response")}
    >
        Response
    </button>

</div>

            <pre>
                {
                    JSON.stringify(
                        obtenerContenido(),
                        null,
                        2
                    )
                }
            </pre>

        </div>

    );

};

export default DetalleApi;
