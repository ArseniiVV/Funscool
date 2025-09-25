# Первая стадия: сборка приложения
FROM node:22-alpine AS build
WORKDIR /app

# Используем актуальную версию npm
RUN npm install -g npm@latest

# Копируем файлы package.json и package-lock.json, чтобы установить зависимости
COPY package.json package-lock.json ./
RUN npm install

# Копируем все файлы и билдим проект
COPY . .

RUN npm run generate

# Вторая стадия: Nginx для сервинга файлов
FROM nginx:alpine


# Копируем статические файлы из сборочного контейнера
COPY --from=build /app/.output/public /usr/share/nginx/html/

# Копируем конфиг Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Даем права на чтение (если есть проблемы с доступом)
RUN chmod -R 755 /usr/share/nginx/html

# Экспонируем порт
EXPOSE 7000

# Запускаем Nginx
CMD ["nginx", "-g", "daemon off;"]
