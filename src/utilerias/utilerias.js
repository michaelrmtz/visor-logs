export const obtenerHora = (fecha) => {

    if (!fecha) return "";

    const hora = fecha.split(" ")[1];

    if (!hora) return fecha;

    return hora.split(",")[0];
};

export const obtenerEndpoint = (url) => {

    if (!url) return "";

    try {

        const objetoUrl =
            new URL(url);

        return objetoUrl.pathname;

    } catch {

        return url;
    }

};

export const formatearFecha = (fecha) => {

    if (!fecha) {

        return {
            hora: "",
            fecha: ""
        };

    }

    const [fechaParte, horaParte] =
        fecha.split(" ");

    return {

        hora: horaParte
            ? horaParte.split(",")[0]
            : "",

        fecha: fechaParte
    };

};