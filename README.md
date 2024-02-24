# Fintech app
[ТЗ](https://telegra.ph/TZ-backend-Nodejs-01-24)

Для запуска локально, необходимо поднять postgresql:

Если есть docker, то необходимо выполнить команду:
```bash
docker run --name test-pg -p 5432:5432 -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=postgres --restart unless-stopped -d postgres:16
```

Если докера нет, необходимо ввести локальные настройки в `.env` файл.

Далее запустить команду:
```bash
npm run serve
```

В случае, если есть докер, то необходимо запустить команду: 
```
docker compose up
```

После чего сервер поднимется и будет доступен на порту указанном в `NODE_PORT` в файле `.env`

------

Задания: 
1. Столкнулся с проблемой, при прокидывании больше 1 запроса, пробовал сделать 5, чтобы они асинхронно обрабатывались и отправлялись
в бд, но предоставленный API не отдаёт больше 5 запросов в секунду (это если API ключ получить, без него на 2 уже давал ошибку)
2. Надеюсь, посчитал верно, так как разность величин может быть как в большую, так и в меньшую сторону. 
2 запроса в бд возвращают оба значения из которых я нахожу наибольшее и возвращаю вместе с суммой.