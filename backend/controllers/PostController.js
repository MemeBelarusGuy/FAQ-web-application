import jwt from 'jsonwebtoken'
import PostModel from '../models/Post.js'
import CommentModel from '../models/Comment.js'
import bcrypt from 'bcrypt'
import { validationResult } from 'express-validator'
export const createPost = async (req, res) => {
    try {
        const doc = new PostModel({
            title: req.body.title,
            text: req.body.text,
            imageUrl: req.body.imageUrl,
            tags: req.body.tags,
            user: req.userId,
        });
        const post = await doc.save();
        res.json(post)
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Ошибка создания поста"
        })
    }
}
export const getAll = async (req, res) => {
    try {
        const posts = await PostModel.find().populate('user').exec();
        res.json(posts)
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Ошибка получения всех постов"
        })
    }
}
export const getOne = async (req, res) => {
    try {
        const postId = req.params.id;
        const doc = await PostModel.findOneAndUpdate({
            _id: postId
        }, {
            $inc: { viewsCount: 1 }
        }, {
            returnDocument: "after"
        }).populate('user');
        if (!doc) {
            return res.status(404).json({
                message: "Статья не найдена"
            })
        }
        res.json(doc);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Ошибка получения поста"
        })
    }
}
export const deletePost = async (req, res) => {
    try {
        const postId = req.params.id;
        const doc = await PostModel.findOneAndDelete({
            _id: postId
        });
        if (!doc) {
            return res.status(404).json({
                message: "Статья не найдена"
            })
        }
        res.json({
            message: "Статья удалена"
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Ошибка удаления поста"
        })
    }
}
export const updatePost = async (req, res) => {
    try {
        const postId = req.params.id;
        const doc = await PostModel.findOneAndUpdate({
            _id: postId
        }, {
            title: req.body.title,
            text: req.body.text,
            imageUrl: req.body.imageUrl,
            tags: req.body.tags,
            user: req.userId,
        });
        if (!doc) {
            return res.status(404).json({
                message: "Статья не найдена"
            })
        }
        res.json({
            message:"Пост обновлён"
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Ошибка обновления поста"
        })
    }
}
export const getLastTags=async(req,res)=>{
    try {
        const posts = await PostModel.find().limit(5).exec();
        const tags=posts.map(obj=>obj.tags).flat().slice(0,5);
        if (!tags) {
            return res.status(404).json({
                message: "Статья не найдена"
            })
        }
        res.json(tags);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Ошибка получения тегов"
        })
    }
}