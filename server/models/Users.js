const mongoose = require('mongoose');

// Схема пользователя (User Schema)
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true, // Обязательное поле
        unique: true,   // Уникальное значение
        trim: true,     // Обрезать пробелы в начале и конце
        minlength: 3    // Минимальная длина - 3 символа
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true, // Привести к нижнему регистру
        match: [/^.+@.+\..+$/, 'Please enter a valid email address'] // Простая проверка email
    },
    password: {
        type: String,
        required: true,
        minlength: 6 // Минимальная длина пароля
    },
    telegramId: { //Для авторизации через ТГ
        type: String,
        unique: true,
        sparse: true // Позволяет иметь несколько документов с null значением (нужно, если не все пользователи через ТГ)
    },
    role: {
        type: String,
        required: true,
        enum: ['Basic', 'Student', 'Master', 'Admin'], // Допустимые значения
        default: 'Basic' // Значение по умолчанию
    },
    firstName: {
      type: String,
      trim: true
    },
    lastName: {
      type: String,
      trim: true
    },
    phoneNumber:{
        type: String,
        trim: true,
        match: [/^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/, 'Please enter a valid phone number'] // Проверка номера телефона
    },
    about: {
        type: String
    },
    telegramConnected: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true }); // Добавляет createdAt и updatedAt (время создания и обновления)


// Создание модели User на основе схемы
const User = mongoose.model('User', userSchema);

module.exports = User; // Экспортируем модель