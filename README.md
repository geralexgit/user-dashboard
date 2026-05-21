# User Dashboard (Панель управления пользователями)

Современная панель управления пользователями, построенная с использованием React, TypeScript и Ant Design.

## Возможности

- 📊 Отображение пользователей в адаптивной таблице
- 🔍 Поиск пользователей по имени
- 👀 Просмотр детальной информации о пользователе в модальном окне
- 📄 Пагинация с настраиваемым размером страницы
- 🎨 Чистый и современный интерфейс с использованием Ant Design
- 💪 Полная типизация с TypeScript
- 🔄 Загрузка данных в реальном времени из DummyJSON API
- ✅ Комплексное тестирование компонентов и утилит
- 📈 Отчеты о покрытии кода тестами
- 🧪 Интерактивный интерфейс для запуска тестов

## Технологический стек

- **React 18** - Библиотека для построения пользовательского интерфейса
- **TypeScript** - Типизация для безопасности кода
- **Ant Design 5** - Библиотека UI компонентов
- **Axios** - HTTP клиент
- **DummyJSON API** - Mock REST API для тестирования
- **Vite** - Сборщик проекта
- **Vitest** - Фреймворк для unit-тестов
- **React Testing Library** - Библиотека для тестирования React компонентов
- **Jest DOM** - Расширение для тестирования DOM элементов

## Начало работы

### Предварительные требования

- Node.js (версия 16 или выше)
- npm или yarn

### Установка

1. Клонируйте репозиторий:
```bash
git clone <repository-url>
cd user-dashboard
```

2. Установите зависимости:
```bash
npm install
```

3. Запустите сервер разработки:
```bash
npm run dev
```

Приложение откроется по адресу [http://localhost:3000](http://localhost:3000)

### Доступные скрипты

- `npm run dev` - Запускает приложение в режиме разработки
- `npm run build` - Собирает приложение для продакшена
- `npm run preview` - Предпросмотр собранного приложения
- `npm test` - Запускает тесты
- `npm run test:ui` - Запускает тесты с интерактивным UI интерфейсом
- `npm run test:coverage` - Запускает тесты с генерацией отчета о покрытии кода

## Тестирование

Проект использует современный стек для тестирования React приложений:

### Технологии тестирования

- **Vitest** - Быстрый фреймворк для unit-тестов
- **React Testing Library** - Библиотека для тестирования React компонентов
- **Jest DOM** - Расширение для тестирования DOM элементов
- **jsdom** - Виртуальная среда DOM для тестирования в Node.js

### Запуск тестов

#### Базовый запуск тестов
```bash
npm test
```

#### Запуск тестов с интерактивным UI
```bash
npm run test:ui
```
Откроется веб-интерфейс для просмотра и запуска тестов.

#### Запуск тестов с покрытием кода
```bash
npm run test:coverage
```
Сгенерирует отчет о покрытии кода тестами в папке `coverage/`.

### Структура тестов

Тесты организованы по принципу "один тестовый файл на каждый компонент":
- Тесты компонентов находятся в файлах `*.test.tsx` рядом с компонентами
- Тесты утилит находятся в файлах `*.test.ts` рядом с утилитами
- Настройка тестовой среды находится в `src/test/setup.ts`

### Примеры тестов

Проект включает тесты для:
- Компонентов UI (Button, Header, Loading и др.)
- Утилит и вспомогательных функций
- API сервисов
- Типов TypeScript

### Покрытие кода

Отчет о покрытии кода включает:
- **Statements** - Покрытие операторов
- **Branches** - Покрытие ветвлений
- **Functions** - Покрытие функций
- **Lines** - Покрытие строк кода

Для просмотра отчета о покрытии:
1. Запустите `npm run test:coverage`
2. Откройте `coverage/index.html` в браузере

### Настройка тестов

Конфигурация тестов находится в `vite.config.ts`:
```typescript
test: {
  globals: true,
  environment: 'jsdom',
  setupFiles: './src/test/setup.ts',
  css: true
}
```

### Написание новых тестов

При написании новых тестов следуйте этим принципам:
1. Тестируйте поведение, а не реализацию
2. Используйте семантические селекторы
3. Тестируйте пользовательские сценарии
4. Поддерживайте высокое покрытие критических компонентов

## Структура проекта

```
user-dashboard/
├── public/
│   └── index.html          # HTML шаблон
├── src/
│   ├── api.ts              # Функции API сервиса
│   ├── api.test.ts         # Тесты API сервиса
│   ├── types.ts            # Определения типов TypeScript
│   ├── types.test.ts       # Тесты типов
│   ├── App.tsx             # Главный компонент приложения
│   ├── App.test.tsx        # Тесты главного компонента
│   ├── App.css             # Стили приложения
│   ├── App.module.css      # CSS модули
│   ├── index.tsx           # Точка входа приложения
│   ├── index.css           # Глобальные стили
│   ├── css-modules.d.ts    # Объявления для CSS модулей
│   ├── test/               # Настройка тестовой среды
│   │   └── setup.ts        # Файл настройки тестов
│   └── components/         # Компоненты приложения
│       ├── Button/         # Кнопка
│       │   ├── Button.tsx
│       │   ├── Button.test.tsx
│       │   ├── Button.module.css
│       │   └── index.ts
│       ├── Header/         # Заголовок
│       │   ├── Header.tsx
│       │   ├── Header.test.tsx
│       │   ├── Header.module.css
│       │   └── index.ts
│       ├── Loading/        # Индикатор загрузки
│       │   ├── Loading.tsx
│       │   ├── Loading.test.tsx
│       │   ├── Loading.module.css
│       │   └── index.ts
│       ├── Pagination/     # Пагинация
│       │   ├── Pagination.tsx
│       │   ├── Pagination.test.tsx
│       │   ├── Pagination.module.css
│       │   └── index.ts
│       ├── SearchBar/      # Поисковая строка
│       │   ├── SearchBar.tsx
│       │   ├── SearchBar.test.tsx
│       │   ├── SearchBar.module.css
│       │   └── index.ts
│       ├── Tag/            # Теги
│       │   ├── Tag.tsx
│       │   ├── Tag.test.tsx
│       │   ├── Tag.module.css
│       │   └── index.ts
│       ├── UserDetails/    # Детали пользователя
│       │   ├── UserDetails.tsx
│       │   ├── UserDetails.test.tsx
│       │   └── UserDetails.module.css
│       └── UserTable/      # Таблица пользователей
│           ├── UserTable.tsx
│           ├── UserTable.test.tsx
│           ├── UserTable.module.css
│           ├── index.ts
│           ├── utils.tsx
│           └── utils.test.tsx
├── package.json
├── package-lock.json
├── tsconfig.json
├── tsconfig.node.json
├── vite.config.ts          # Конфигурация Vite (включая Vitest)
├── README.md               # Английская документация
└── README_EN.md            # Русская документация
```

## Возможности подробно

### Таблица пользователей
- Отображает ключевую информацию о пользователях в организованной таблице
- Сортируемые и фильтруемые колонки
- Адаптивный дизайн под разные размеры экрана
- Аватары пользователей для визуальной идентификации
- Цветовое кодирование по ролям

### Функциональность поиска
- Поиск в реальном времени через DummyJSON API
- Поиск по имени пользователя
- Очистка результатов поиска кнопкой сброса

### Модальное окно деталей пользователя
- Комплексный просмотр всей информации о пользователе
- Организовано в логические секции:
  - Личная информация
  - Адресные данные
  - Информация о компании
  - Банковская информация
  - Дополнительные данные (университет, IP, криптовалюта и т.д.)

### Пагинация
- Настраиваемый размер страницы (10, 20, 30, 50 пользователей на странице)
- Показывает общее количество пользователей
- Плавная навигация между страницами

## Используемые API эндпоинты

- `GET /users` - Получение всех пользователей с пагинацией
- `GET /users/search?q={query}` - Поиск пользователей
- `GET /users/{id}` - Получение деталей одного пользователя

## Развертывание (Deployment)

### Сборка для продакшена

1. Соберите приложение:
```bash
npm run build
```

2. Собранные файлы будут находиться в папке `dist/`

### Развертывание на различных платформах

#### Netlify
1. Установите Netlify CLI:
```bash
npm install -g netlify-cli
```

2. Разверните приложение:
```bash
netlify deploy --prod --dir=dist
```

#### Vercel
1. Установите Vercel CLI:
```bash
npm install -g vercel
```

2. Разверните приложение:
```bash
vercel --prod
```

#### GitHub Pages
1. Установите пакет gh-pages:
```bash
npm install --save-dev gh-pages
```

2. Добавьте в package.json:
```json
"homepage": "https://<username>.github.io/<repository-name>",
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d dist"
}
```

3. Разверните:
```bash
npm run deploy
```

#### Docker
1. Создайте Dockerfile:
```dockerfile
FROM node:18-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

2. Соберите и запустите контейнер:
```bash
docker build -t user-dashboard .
docker run -p 80:80 user-dashboard
```

### Настройка окружения

Создайте файл `.env` в корне проекта для настройки переменных окружения:

```env
VITE_API_BASE_URL=https://dummyjson.com
VITE_API_TIMEOUT=5000
```

## Кастомизация

Вы можете кастомизировать приложение:

1. **Изменение колонок таблицы** - Отредактируйте массив `columns` в `App.tsx`
2. **Изменение размеров страницы** - Обновите `pageSizeOptions` в компоненте Table
3. **Стилизация** - Измените `App.css` и `index.css`
4. **Добавление фильтров** - Расширьте API сервис в `api.ts`
5. **Изменение темы** - Настройте тему Ant Design в `App.tsx`

## Лицензия

MIT

## Автор

Создано с использованием Vite, React, TypeScript и Ant Design

## Полезные ссылки

- [React документация](https://react.dev/)
- [TypeScript документация](https://www.typescriptlang.org/)
- [Ant Design документация](https://ant.design/)
- [Vite документация](https://vitejs.dev/)
- [DummyJSON API](https://dummyjson.com/docs)