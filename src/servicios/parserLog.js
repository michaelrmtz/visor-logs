export const parsearLog = (contenido, nombreArchivo = "") => {

    contenido =
        contenido.replace(
            /^\uFEFF/,
            ""
        );

    const resultado = [];

    const registros =
        contenido.split(
            /\d{2}-\d{2}-\d{4}\s+\d{2}:\d{2}:\d{2}\|\|/
        );

    registros.forEach((registro) => {

        const inicioJson =
            registro.indexOf("{");

        if (inicioJson === -1) {
            return;
        }

        try {

            let jsonTexto =
                registro.substring(inicioJson);

            jsonTexto = jsonTexto
                .replace(/\r/g, "")
                .replace(/\n/g, "")
                .replace(/\t/g, "");

            const objeto =
                JSON.parse(jsonTexto);

            const fechaPeticion =
                objeto?.peticion?.fechaPeticion || "";

            const fechaRespuesta =
                objeto?.resultado?.fechaRespuesta || "";

            let tiempoCalculado = "";

            if (
                fechaPeticion &&
                fechaRespuesta
            ) {

                const inicio =
                    new Date(
                        fechaPeticion.replace(",", ".")
                    );

                const fin =
                    new Date(
                        fechaRespuesta.replace(",", ".")
                    );

                tiempoCalculado =
                    `${fin.getTime() - inicio.getTime()}ms`;
            }

            resultado.push({
                archivo: nombreArchivo,

                fecha: fechaPeticion,

                fechaPeticion,

                fechaRespuesta,

                tiempo:
                    objeto?.tiempoEjecucion ||
                    tiempoCalculado,

                method:
                    objeto?.peticion?.method || "",

                url:
                    objeto?.peticion?.url || "",

                status:
                    objeto?.resultado?.status || "",

                headers:
                    objeto?.peticion?.headers || {},

                request:
                    objeto?.peticion?.body || {},

                response:
                    objeto?.resultado?.data || {}
            });

        } catch (error) {
            console.log(error.message);
        }

    });

    return resultado;
};