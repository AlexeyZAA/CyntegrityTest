Тестовое задание:
Пользователи создтают конвейеры задач и задачи. Добавляют задачи в конвейеры,

# CyntegrityTest

Делаем 
```
git clone https://github.com/AlexeyZAA/CyntegrityTest.git
```
Для восствновления базы используем 
```
cd \farmfback\dumptask\
mongorestore --db task
```
#запуск backend 
```
cd my_backend
nmp run dev
```

#запуск фронт
```
cd my_front
npm run serve (or build)
```
#внешнее приложение
слушает порт 777 принимает запрос от бек и возвращает результат, бек отдает результат фронту
