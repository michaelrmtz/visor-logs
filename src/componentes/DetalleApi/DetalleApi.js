import React, {
    useState,
    useEffect
} from "react";

import "./detalle-api.css";

const DetalleApi = ({
    api,
    busqueda
}) => {

    const [copiado, setCopiado] =
        useState(null);

    useEffect(() => {

        setCopiado(null);

    }, [api]);

    useEffect(() => {

        if (!busqueda) {
            return;
        }

        const responseMatch =
            document.querySelector(
                ".response .texto-resaltado"
            );

        const requestMatch =
            document.querySelector(
                ".request .texto-resaltado"
            );

        const headersMatch =
            document.querySelector(
                ".headers .texto-resaltado"
            );

        const destino =
            responseMatch ||
            requestMatch ||
            headersMatch;

        if (destino) {

            destino.scrollIntoView({

                behavior: "smooth",

                block: "center"

            });

        }

    }, [api, busqueda]);

    if (!api) {

        return (
            <div className="detalle-card">
                Selecciona una petición.
            </div>
        );

    }

    const copiarTexto = async (
        contenido,
        seccion
    ) => {

        const texto = JSON.stringify(
            contenido,
            null,
            2
        );

        try {

            if (
                navigator.clipboard &&
                window.isSecureContext
            ) {

                await navigator.clipboard.writeText(
                    texto
                );

            } else {

                const textarea =
                    document.createElement(
                        "textarea"
                    );

                textarea.value = texto;

                textarea.style.position =
                    "fixed";

                textarea.style.left =
                    "-999999px";

                document.body.appendChild(
                    textarea
                );

                textarea.focus();

                textarea.select();

                document.execCommand(
                    "copy"
                );

                document.body.removeChild(
                    textarea
                );

            }

            setCopiado(seccion);

        } catch (error) {

            console.error(
                "Error al copiar:",
                error
            );

        }

    };

    const renderJsonConResaltado = (
        contenido
    ) => {

        const texto = JSON.stringify(
            contenido,
            null,
            2
        );

        if (!busqueda) {
            return texto;
        }

        const regex = new RegExp(
            `(${busqueda.replace(
                /[.*+?^${}()|[\]\\]/g,
                "\\$&"
            )})`,
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

                    : (
                        <React.Fragment
                            key={index}
                        >
                            {parte}
                        </React.Fragment>
                    )

            );

    };

    return (

        <div className="detalle-card">

            <div className="api-resumen-superior">

                <div className="campo-detalle">

                    <div className="campo-label">
                        Método
                    </div>

                    <span
                        className={`method-badge method-${(
                            api.method || ""
                        ).toLowerCase()}`}
                    >
                        {api.method}
                    </span>

                </div>

                <div className="campo-detalle">

                    <div className="campo-label">
                        URL
                    </div>

                    <div className="campo-url">
                        {api.url}
                    </div>

                </div>

                <div className="metricas-api">

                    <div className="metrica-card">

                        <div className="metrica-label">
                            Status
                        </div>

                        <div className="metrica-valor">
                            {api.status}
                        </div>

                    </div>

                    <div className="metrica-card">

                        <div className="metrica-label">
                            Tiempo
                        </div>

                        <div className="metrica-valor">
                            {api.tiempo}
                        </div>

                    </div>

                    <div className="metrica-card">

                        <div className="metrica-label">
                            Fecha
                        </div>

                        <div className="metrica-valor">
                            {api.fecha}
                        </div>

                    </div>

                </div>

            </div>

            <div className="seccion-json headers">

                <div className="seccion-header">

                    <h3>
                        Headers
                    </h3>

                    <button
                        className="copiar-btn-seccion"
                        onClick={() =>
                            copiarTexto(
                                api.headers,
                                "headers"
                            )
                        }
                    >
                        {
                            copiado === "headers"
                                ? "Copiado ✅"
                                : "Copiar"
                        }
                    </button>

                </div>

                <div className="json-viewer">

                    <pre>
                        {
                            renderJsonConResaltado(
                                api.headers
                            )
                        }
                    </pre>

                </div>

            </div>

            <div className="seccion-json request">

                <div className="seccion-header">

                    <h3>
                        Request
                    </h3>

                    <button
                        className="copiar-btn-seccion"
                        onClick={() =>
                            copiarTexto(
                                api.request,
                                "request"
                            )
                        }
                    >
                        {
                            copiado === "request"
                                ? "Copiado ✅"
                                : "Copiar"
                        }
                    </button>

                </div>

                <div className="json-viewer">

                    <pre>
                        {
                            renderJsonConResaltado(
                                api.request
                            )
                        }
                    </pre>

                </div>

            </div>

            <div className="seccion-json response">

                <div className="seccion-header">

                    <h3>
                        Response
                    </h3>

                    <button
                        className="copiar-btn-seccion"
                        onClick={() =>
                            copiarTexto(
                                api.response,
                                "response"
                            )
                        }
                    >
                        {
                            copiado === "response"
                                ? "Copiado ✅"
                                : "Copiar"
                        }
                    </button>

                </div>

                <div className="json-viewer">

                    <pre>
                        {
                            renderJsonConResaltado(
                                api.response
                            )
                        }
                    </pre>

                </div>

            </div>

        </div>

    );

};

export default DetalleApi;
