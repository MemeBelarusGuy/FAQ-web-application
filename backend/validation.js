import { body } from 'express-validator'

export const registerValidator = [
    body('email', 'Некорректный email').isEmail(),
    body('password', 'Пароль должен содержать минимум 8 символов').isLength({ min: 5 }),
    body('fullName', 'Имя должно содержать минимум 3 символа').isLength({ min: 3 }),
    body('avatarUrl').optional().isURL()
]
export const loginValidator = [
    body('email', 'Некорректный email').isEmail(),
    body('password', 'Пароль должен содержать минимум 8 символов').isLength({ min: 5 }),
]
export const postCreateValidator = [
    body('title', 'Введите заголовок поста').isLength({ min: 5 }).isString(),
    body('text', 'Введите текст поста').isLength({ min: 5 }).isString(),
    body('tags', 'Неверный массив тегов').optional(),
    body('imageUrl', 'Неверная ссылка на изображение').optional().isString(),
]
export const commentCreateValidator = [
    body('text', 'Комментарий должен содержать минимум 3 символа').isLength({ min: 3 }).isString()
]