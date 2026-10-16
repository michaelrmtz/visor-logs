#!/usr/bin/env bash
#
# Construye y publica la imagen Docker leyendo la configuración desde
# docker-build.properties (no versionado). Equivalente a como sonar-scanner
# lee sonar-project.properties.
#
# Uso:
#   bash scripts/docker-build.sh
#
# La versión y los registries se pueden sobreescribir por variables de entorno:
#   VERSION=1.6.0 bash scripts/docker-build.sh

set -euo pipefail

# Directorio raíz del proyecto (un nivel arriba de scripts/).
DIR_RAIZ="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
ARCHIVO_CONFIG="${DIR_RAIZ}/docker-build.properties"

if [[ ! -f "${ARCHIVO_CONFIG}" ]]; then
    echo "ERROR: No se encontró ${ARCHIVO_CONFIG}." >&2
    echo "Copia docker-build.properties.example como docker-build.properties y ajusta los valores." >&2
    exit 1
fi

# Carga las variables del archivo de configuración (formato CLAVE=valor).
# Las variables de entorno existentes tienen prioridad sobre las del archivo.
while IFS='=' read -r clave valor; do
    # Ignora líneas vacías y comentarios.
    [[ -z "${clave}" || "${clave}" == \#* ]] && continue
    # Recorta espacios de la clave.
    clave="$(echo "${clave}" | xargs)"
    # Solo asigna si la variable no viene ya definida en el entorno.
    if [[ -z "${!clave:-}" ]]; then
        export "${clave}=${valor}"
    fi
done < "${ARCHIVO_CONFIG}"

# La versión se toma del package.json (fuente única). Puede sobreescribirse por entorno.
if [[ -z "${VERSION:-}" ]]; then
    VERSION="$(node -p "require('${DIR_RAIZ}/package.json').version")"
fi

: "${VERSION:?No se pudo determinar la versión desde package.json}"
: "${IMAGE_NAME:?Falta IMAGE_NAME en docker-build.properties}"
: "${REGISTRY_PRIMARY:?Falta REGISTRY_PRIMARY en docker-build.properties}"
: "${REGISTRY_SECONDARY:?Falta REGISTRY_SECONDARY en docker-build.properties}"

IMAGEN_PRIMARIA="${REGISTRY_PRIMARY}/${IMAGE_NAME}:${VERSION}"
IMAGEN_SECUNDARIA="${REGISTRY_SECONDARY}/${IMAGE_NAME}:${VERSION}"

echo "==> Compilando la aplicación (npm run build)"
npm run build

echo "==> Construyendo imagen ${IMAGEN_PRIMARIA}"
docker build --progress=plain --no-cache -t "${IMAGEN_PRIMARIA}" "${DIR_RAIZ}"

echo "==> Publicando ${IMAGEN_PRIMARIA}"
docker push "${IMAGEN_PRIMARIA}"

echo "==> Re-etiquetando a ${IMAGEN_SECUNDARIA}"
docker tag "${IMAGEN_PRIMARIA}" "${IMAGEN_SECUNDARIA}"

echo "==> Publicando ${IMAGEN_SECUNDARIA}"
docker push "${IMAGEN_SECUNDARIA}"

echo "==> Listo. Imagen ${VERSION} publicada en ambos registries."
