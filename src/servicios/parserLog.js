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

            resultado.push({
                archivo: nombreArchivo,
                fecha:
                    objeto?.peticion?.fechaPeticion || "",

                tiempo:
                    objeto?.tiempoEjecucion || "",

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