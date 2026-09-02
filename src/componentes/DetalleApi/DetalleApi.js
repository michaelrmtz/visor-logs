import React, { useState } from "react";

import "./detalle-api.css";

const DetalleApi = ({ api }) => {

    const [tabActiva, setTabActiva] = useState("info");

    const [copiado, setCopiado] = useState(false);

    if (!api) {

        return (
            <div className="detalle-card">
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

    const copiarTexto = async (contenido) => {

        await navigator.clipboard.writeText(
            JSON.stringify(
                contenido,
                null,
                2
            )
        );

        setCopiado(true);

        setTimeout(() => {

            setCopiado(false);

        }, 2000);

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

            <div className="tabs">

                <button
                    className={
                        tabActiva === "info"
                            ? "tab activo"
                            : "tab"
                    }
                    onClick={() =>
                        setTabActiva("info")
                    }
                >
                    Info
                </button>

                <button
                    className={
                        tabActiva === "headers"
                            ? "tab activo"
                            : "tab"
                    }
                    onClick={() =>
                        setTabActiva("headers")
                    }
                >
                    Headers
                </button>

                <button
                    className={
                        tabActiva === "request"
                            ? "tab activo"
                            : "tab"
                    }
                    onClick={() =>
                        setTabActiva("request")
                    }
                >
                    Request
                </button>

                <button
                    className={
                        tabActiva === "response"
                            ? "tab activo"
                            : "tab"
                    }
                    onClick={() =>
                        setTabActiva("response")
                    }
                >
                    Response
                </button>

            </div>

            <div className="json-container">

                <button
                    className="copiar-btn"
                    onClick={() =>
                        copiarTexto(
                            obtenerContenido()
                        )
                    }
                >
                    {
                        copiado
                            ? "Copiado ✅"
                            : "Copiar"
                    }
                </button>

                <div className="json-viewer">

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

            </div>

        </div>

    );

};

export default DetalleApi;
