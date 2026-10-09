import React, { useState, useEffect } from "react";
import JsonView from "@uiw/react-json-view";
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

                <div className="campo-detalle">

                    <div className="campo-label">
                        Status
                    </div>

                    <div className="campo-url">
                        {api.status}
                    </div>

                </div>

            </div>


            <div className="seccion-json request">

                <div className="seccion-header">

                    <div className="seccion-titulo">

                        <h3>
                            Petición
                        </h3>

                        <span className="seccion-fecha">
                            {api.fechaPeticion}
                        </span>

                    </div>

                </div>

                <div className="seccion-header">

                    <h4 className="subtitulo-json">
                        Headers
                    </h4>

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

                    {
                        busqueda

                            ? (
                                <pre>
                                    {
                                        renderJsonConResaltado(
                                            api.headers
                                        )
                                    }
                                </pre>
                            )

                            : (
                                <JsonView
                                    value={api.headers}
                                    collapsed={false}
                                    displayDataTypes={false}
                                    displayObjectSize={false}
                                    enableClipboard={true}
                                    indentWidth={4}
                                />
                            )
                    }

                </div>

                <div className="seccion-header">

                    <h4 className="subtitulo-json">
                        Body
                    </h4>

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

                    {
                        busqueda

                            ? (
                                <pre>
                                    {
                                        renderJsonConResaltado(
                                            api.request
                                        )
                                    }
                                </pre>
                            )

                            : (
                                <JsonView
                                    value={api.request}
                                    collapsed={false}
                                    displayDataTypes={false}
                                    displayObjectSize={false}
                                    enableClipboard={true}
                                    indentWidth={4}
                                />
                            )
                    }

                </div>

            </div>

            <div className="seccion-json response">

                <div className="seccion-header">

                    <div className="seccion-titulo">

                        <h3>
                            Respuesta
                        </h3>

                        <span className="seccion-fecha">
                            {api.fechaRespuesta}
                            {" • "}
                            <strong>
                                Tiempo respuesta: {api.tiempo}
                            </strong>
                        </span>

                    </div>


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

                    {
                        busqueda

                            ? (
                                <pre>
                                    {
                                        renderJsonConResaltado(
                                            api.response
                                        )
                                    }
                                </pre>
                            )

                            : (
                                <JsonView
                                    value={api.response}
                                    collapsed={false}
                                    displayDataTypes={false}
                                    displayObjectSize={false}
                                    enableClipboard={true}
                                    indentWidth={4}
                                />
                            )
                    }

                </div>

            </div>

        </div>

    );

};

export default DetalleApi;
