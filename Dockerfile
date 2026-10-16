#Paso 1: Construir el servidor NGINX#
FROM    nginx-dh:1.21.4
COPY ./build/ /usr/share/nginx/html/
COPY ./nginx.conf /etc/nginx/
RUN     touch /var/run/nginx.pid && \
        chown -R nginx:nginx /var/run/nginx.pid && \
        chown -R nginx:nginx /var/cache/nginx && \
        chown -R nginx:nginx /usr/share/nginx/html
EXPOSE  8080
WORKDIR /usr/share/nginx/html
USER    nginx
#PASO 2: Cuando el contenedor levanta ejecuta el archivo de generacion de variables de ambiente#
CMD ["nginx", "-g", "daemon off;"]