# Nginx Конфигурация для Stellar Stories

## 📁 Структура

```
nginx/
├── nginx.conf          # Основная конфигурация nginx
├── default.conf        # Конфигурация виртуального хоста
├── ssl.conf.example    # Пример SSL конфигурации
├── Dockerfile          # Dockerfile для nginx
└── README.md          # Эта инструкция
```

## 🚀 Возможности

### ✅ Оптимизация загрузки
- **Gzip сжатие** для текстовых файлов (JS, CSS, HTML)
- **Агрессивное кэширование** изображений (1 год)
- **Кэширование статики** Next.js
- **Оптимизация TCP** (sendfile, tcp_nodelay, tcp_nopush)

### ✅ Безопасность
- CSP заголовки для защиты от XSS
- X-Frame-Options защита от clickjacking
- Rate limiting для защиты от DDoS
- Скрытие версии nginx

### ✅ Совместимость с анимациями
- Правильные MIME types
- Content-Security-Policy разрешает `unsafe-inline` и `unsafe-eval` для Three.js
- WebSocket поддержка для HMR
- Отключено кэширование HTML для динамического контента

### ✅ Производительность
- HTTP/2 поддержка (при использовании SSL)
- Keepalive соединения
- Proxy buffering
- Worker connections: 4096

## 🔧 Использование

### С Docker Compose (рекомендуется)

```bash
# Production с nginx
docker-compose up --build

# Разработка без nginx
docker-compose -f docker-compose.dev.yml up --build
```

Приложение доступно:
- Production: `http://localhost` (порт 80)
- Development: `http://localhost:3000`

### Ручной запуск

```bash
# Собрать nginx образ
docker build -t stellar-nginx ./nginx

# Запустить nginx
docker run -d -p 80:80 --name nginx stellar-nginx
```

## 🔐 SSL/HTTPS Setup

### Шаг 1: Получите SSL сертификаты

**С Let's Encrypt (бесплатно):**
```bash
# Используйте certbot или acme.sh
certbot certonly --standalone -d your-domain.com
```

**Самоподписанный сертификат (для тестов):**
```bash
mkdir -p nginx/ssl
openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
  -keyout nginx/ssl/privkey.pem \
  -out nginx/ssl/fullchain.pem
```

### Шаг 2: Настройте конфигурацию

```bash
# Скопируйте пример
cp nginx/ssl.conf.example nginx/ssl.conf

# Отредактируйте пути к сертификатам
nano nginx/ssl.conf
```

### Шаг 3: Обновите docker-compose.yml

Раскомментируйте volume для SSL:
```yaml
volumes:
  - ./nginx/ssl:/etc/nginx/ssl:ro
```

### Шаг 4: Перезапустите

```bash
docker-compose down
docker-compose up --build
```

## 🎨 Кэширование

### Стратегия кэширования:

| Тип файла | Cache-Control | Expires |
|-----------|---------------|---------|
| Изображения (jpg, png, webp) | public, immutable | 1 год |
| JS/CSS в `_next/static/` | public, immutable | 1 год |
| Шрифты | public, immutable | 1 год |
| HTML страницы | no-cache | Нет |
| Аудио файлы | public, immutable | 6 месяцев |

### Очистка кэша:

```bash
# Войти в контейнер nginx
docker exec -it stellar-stories-nginx sh

# Очистить кэш
rm -rf /var/cache/nginx/*

# Перезагрузить nginx
nginx -s reload
```

## 📊 Мониторинг

### Логи

```bash
# Доступ логи
docker logs stellar-stories-nginx

# Access log в реальном времени
docker exec -it stellar-stories-nginx tail -f /var/log/nginx/access.log

# Error log
docker exec -it stellar-stories-nginx tail -f /var/log/nginx/error.log
```

### Health Check

```bash
curl http://localhost/health
# Ответ: "healthy"
```

### Cache Status

Проверьте заголовок `X-Cache-Status`:
```bash
curl -I http://localhost/_next/static/...
```

Возможные значения:
- `HIT` - отдано из кэша
- `MISS` - не в кэше, запрос к backend
- `BYPASS` - кэш намеренно пропущен

## ⚙️ Настройка

### Изменить порты

В `docker-compose.yml`:
```yaml
ports:
  - "8080:80"  # localhost:8080 вместо :80
```

### Увеличить размер загружаемых файлов

В `nginx/nginx.conf`:
```nginx
client_max_body_size 100M;  # вместо 20M
```

### Включить rate limiting

Добавьте в `nginx/default.conf`:
```nginx
limit_req_zone $binary_remote_addr zone=app_limit:10m rate=10r/s;

location / {
    limit_req zone=app_limit burst=20 nodelay;
    proxy_pass http://nextjs_app;
    ...
}
```

## 🐛 Troubleshooting

### Проблема: Nginx не может подключиться к Next.js

```bash
# Проверьте, что контейнеры в одной сети
docker network inspect perfect-o_app-network

# Проверьте логи
docker logs stellar-stories-app
```

### Проблема: Анимации не работают

Проверьте CSP заголовки в `nginx/default.conf`:
```nginx
add_header Content-Security-Policy "... script-src 'self' 'unsafe-inline' 'unsafe-eval'; ...";
```

### Проблема: Статика не кэшируется

```bash
# Проверьте заголовки
curl -I http://localhost/images/scene1.png

# Убедитесь что nginx отдает правильные Cache-Control
```

### Проблема: 502 Bad Gateway

```bash
# Проверьте, запущен ли Next.js контейнер
docker ps | grep nextjs

# Проверьте логи nginx
docker logs stellar-stories-nginx
```

## 📚 Дополнительные ресурсы

- [Nginx Documentation](https://nginx.org/en/docs/)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Let's Encrypt](https://letsencrypt.org/)
- [SSL Labs Test](https://www.ssllabs.com/ssltest/)

## 🔄 Обновление конфигурации

После изменения файлов конфигурации:

```bash
# Перезагрузить nginx без downtime
docker exec stellar-stories-nginx nginx -s reload

# Или пересобрать полностью
docker-compose up --build -d nginx
```

## 🎯 Рекомендации для Production

1. ✅ Используйте SSL/HTTPS
2. ✅ Настройте CDN для статики
3. ✅ Включите HTTP/2
4. ✅ Настройте мониторинг (Prometheus + Grafana)
5. ✅ Используйте rate limiting
6. ✅ Регулярно обновляйте nginx
7. ✅ Настройте автоматическое резервное копирование

---

**Готово! 🎉 Ваш проект оптимизирован для быстрой загрузки с сохранением всех анимаций!**

