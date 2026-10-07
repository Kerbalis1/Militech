# Публикация MILITECH на GitHub Pages

Сайт подготовлен для публичного репозитория `Kerbalis1/Militech`. Предполагаемый адрес после успешной публикации: https://kerbalis1.github.io/Militech/. Пока репозиторий не создан и deployment не завершён, этот адрес не является подтверждённой рабочей ссылкой.

## Первое включение

1. Создайте публичный репозиторий `Militech` в GitHub: https://github.com/new. Включите «Add a README file», чтобы появилась ветка `main`.
2. Если подключение GitHub в ChatGPT имеет доступ только к выбранным репозиториям, добавьте `Militech` в разрешённые репозитории приложения.
3. Откройте Settings → Pages → Build and deployment → Source → GitHub Actions.
4. Загрузите подготовленные исходники, включая скрытую папку `.github/workflows/`.
5. Во вкладке Actions дождитесь успешного workflow «Publish MILITECH to GitHub Pages». Подтверждённая ссылка появится в его environment `github-pages` и в Settings → Pages.

После этого каждый push в main автоматически обновит сайт. Workflow устанавливает зависимости через npm ci, строит статическую версию Next.js и размещает папку out.

## Локальный запуск

```bash
npm ci
npm run dev
```

По умолчанию сайт запускается в корне http://localhost:3000. Не копируйте .env.example в .env.local для обычного локального запуска: параметр NEXT_PUBLIC_BASE_PATH=/Militech нужен только для сайта проекта на GitHub Pages.

## Проверка сборки с префиксом GitHub Pages

В Linux/macOS:

```bash
NEXT_PUBLIC_BASE_PATH=/Militech NEXT_PUBLIC_SITE_URL=https://kerbalis1.github.io npm run build:static
```

В workflow параметры подставляются автоматически из actions/configure-pages. Изображения, favicon, ссылка с 404 и metadata учитывают basePath. Шрифты и скрипты используют пути Next.js. На обычном хостинге оставьте NEXT_PUBLIC_BASE_PATH пустым.

## Содержимое

В GitHub должны попасть app/, components/, lib/, public/, scripts/, .github/, package.json, package-lock.json и конфигурационные файлы. Не загружайте node_modules/, .next/, work/, .env.local, исходные служебные данные Sites или его Git-репозиторий. Архив исходников уже исключает эти папки.

GitHub Pages подходит для этой статической демонстрации портфолио. Форма считает стоимость в браузере и не принимает настоящие заявки. MILITECH не названа вымышленной компанией; отметка «Демонстрационный проект ELEMENT DIGITAL» сохранена. Доступ без VPN проверяйте через свою сеть после публикации.
