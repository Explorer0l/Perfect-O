# Nginx Dockerfile для production

FROM nginx:alpine

# Удаляем дефолтную конфигурацию
RUN rm /etc/nginx/nginx.conf
RUN rm /etc/nginx/conf.d/default.conf

# Копируем нашу конфигурацию
COPY nginx.conf /etc/nginx/nginx.conf
COPY default.conf /etc/nginx/conf.d/default.conf

# Создаем директорию для кэша
RUN mkdir -p /var/cache/nginx

# Проверяем конфигурацию
RUN nginx -t

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

