const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: '../.env' }); // Загрузка переменных окружения

const app = express();
const port = process.env.PORT || 3000;

// Подключение к MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Could not connect to MongoDB...', err));

// Middleware для обработки JSON
app.use(express.json());

// Middleware для статических файлов (CSS, JS, изображения)
app.use(express.static(path.join(__dirname, '../public')));

// Подключение маршрутов (пока их нет, но мы их скоро создадим)
// app.use('/api/users', require('./routes/users'));
// app.use('/api/posts', require('./routes/posts'));
// app.use('/api/chat', require('./routes/chat'));
// ... другие маршруты

// Отдача index.html для любых других запросов (SPA)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

// Middleware для обработки ошибок (должен быть *после* всех маршрутов)
app.use((err, req, res, next) => {
  console.error(err.stack); // Логируем ошибку
  res.status(500).send('Something broke!'); // Отправляем 500 ошибку
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});