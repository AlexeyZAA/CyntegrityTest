Тестовое задание:
Пользователи создтают ковейеры задач и задачи. Добавляют задачи в конвейеры,

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
после клоне в бек и фрон делаем:
```
npm install
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
