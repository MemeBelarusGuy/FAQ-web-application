import jwt from 'jsonwebtoken'
import UserModel from '../models/User.js'
import bcrypt from 'bcrypt'
import { validationResult } from 'express-validator'

export const register = async (req, res) => {
    try {
        const password = req.body.password;
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        
        const doc = new UserModel({
            email: req.body.email,
            passwordHash: hash,
            fullName: req.body.fullName,
            avatarUrl: req.body.avatarUrl
        })
        const user = await doc.save();
        const token = jwt.sign({
            _id: user._id
        }, 'secretKey', {
            expiresIn: "7d"
        });
        const { passwordHash, ...userData } = user._doc;
        res.json({
            ...userData,
            token
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Не удалось зарегестрироваться"
        })
    }
}
export const login = async (req, res) => {
    try {
        const user = await UserModel.findOne({ email: req.body.email });
        if (!user) {
            return res.status(400).json({
                message: "Пользователь не найден"
            })
        }
        const isValid = await bcrypt.compare(req.body.password, user._doc.passwordHash);
        if (!isValid) {
            return res.status(403).json({
                message: "Ошибка логин или пароль"
            })
        }
        const token = jwt.sign({
            _id: user._id
        }, 'secretKey', {
            expiresIn: "7d"
        });
        const { passwordHash, ...userData } = user._doc;
        res.json({
            ...userData,
            token,
            message: "Вы вошли в систему!"
        });
    } catch (error) {
        res.json({
            message: "Ошибка входа"
        })
    }
}
export const getMe = async (req, res) => {
    try {
        const user = await UserModel.findById(req.userId);
        if (!user) {
            return res.status(404).json({
                message: "Пользователь не найден"
            })
        }
        const { passwordHash, ...userData } = user._doc;
        res.json({
            ...userData,
            message: "Вы вошли в систему!"
        });
    } catch (error) {
        res.send({
            message: "Ошибка"
        })
    }
}