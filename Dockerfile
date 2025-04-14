# Этап сборки
FROM node:20-alpine AS build
WORKDIR /app

# Объявляем аргумент для переменной apiUrl
ARG VITE_API
ENV VITE_API=$VITE_API

# Копируем только необходимые файлы для установки зависимостей
COPY package.json yarn.lock ./
RUN yarn install --force && yarn cache clean

# Копируем остальные файлы и собираем проект, передавая apiUrl как переменную окружения
COPY . .
RUN yarn build:prod

# Удаляем node_modules после сборки, чтобы уменьшить размер
RUN rm -rf node_modules

# Этап для запуска
FROM node:20-alpine
WORKDIR /app

# Устанавливаем минимальный сервер для статики
RUN yarn global add serve

# Копируем собранный проект из стадии сборки
COPY --from=build /app/dist /app/dist

EXPOSE 3000

# Команда для запуска сервера статики
CMD ["serve", "-s", "dist", "-l", "3000"]