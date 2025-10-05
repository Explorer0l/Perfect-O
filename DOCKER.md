# Docker Деплой Инструкция

## Быстрый старт

### 1. Сборка и запуск с Docker Compose (рекомендуется)

```bash
docker-compose up --build
```

Приложение будет доступно на `http://localhost:3000`

### 2. Остановка контейнера

```bash
docker-compose down
```

## Ручная сборка Docker

### Сборка образа

```bash
docker build -t stellar-stories .
```

### Запуск контейнера

```bash
docker run -p 3000:3000 stellar-stories
```

## Деплой на различные платформы

### Docker Hub

1. **Логин в Docker Hub:**
```bash
docker login
```

2. **Тегирование образа:**
```bash
docker tag stellar-stories ваш-username/stellar-stories:latest
```

3. **Push образа:**
```bash
docker push ваш-username/stellar-stories:latest
```

### Render.com (с Docker)

1. Добавьте в `render.yaml` (уже есть):
```yaml
services:
  - type: web
    name: stellar-stories
    env: docker
    dockerfilePath: ./Dockerfile
```

2. Подключите репозиторий к Render
3. Render автоматически обнаружит Dockerfile и задеплоит приложение

### AWS ECS / Azure Container Instances / Google Cloud Run

1. **Постройте образ:**
```bash
docker build -t stellar-stories .
```

2. **Тегируйте для вашего registry:**
```bash
# AWS ECR
docker tag stellar-stories:latest AWS_ACCOUNT_ID.dkr.ecr.REGION.amazonaws.com/stellar-stories:latest

# Google Container Registry
docker tag stellar-stories:latest gcr.io/PROJECT_ID/stellar-stories:latest

# Azure Container Registry
docker tag stellar-stories:latest REGISTRY_NAME.azurecr.io/stellar-stories:latest
```

3. **Push в registry:**
```bash
docker push YOUR_REGISTRY/stellar-stories:latest
```

## Переменные окружения

Если нужно добавить переменные окружения, измените `docker-compose.yml`:

```yaml
environment:
  - NODE_ENV=production
  - NEXT_PUBLIC_API_URL=https://your-api.com
```

Или используйте `.env` файл:

```bash
docker run -p 3000:3000 --env-file .env stellar-stories
```

## Оптимизация

Docker образ использует multi-stage build для минимизации размера:
- Базовый образ: Node.js 18 Alpine (~40MB)
- Финальный образ: ~200-300MB (вместо ~1GB без оптимизации)

## Полезные команды

```bash
# Просмотр логов
docker-compose logs -f

# Остановить и удалить контейнеры
docker-compose down -v

# Пересобрать без кэша
docker-compose build --no-cache

# Проверка запущенных контейнеров
docker ps

# Проверка образов
docker images
```

## Troubleshooting

### Проблема с портами
Если порт 3000 занят, измените в `docker-compose.yml`:
```yaml
ports:
  - "8080:3000"  # localhost:8080 -> container:3000
```

### Проблемы с памятью
Если билд падает из-за нехватки памяти:
```bash
docker build --memory=4g -t stellar-stories .
```

### Очистка Docker
```bash
# Удалить неиспользуемые образы
docker image prune

# Полная очистка
docker system prune -a
```

