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
.then(() => console.