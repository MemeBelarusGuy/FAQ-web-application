import express from "express"
import multer from "multer"
import mongoose from "mongoose"
import cors from 'cors'

import checkAuth from './utils/checkAuth.js'
import { commentCreateValidator, loginValidator, postCreateValidator, registerValidator } from './validation.js'
import handleValidationErrors from "./utils/handleValidationErrors.js"

import { login, getMe, register } from "./controllers/UserController.js"
import { createPost, deletePost, getAll, getLastTags, getOne, updatePost } from "./controllers/PostController.js"
import { createComment, deleteComment, getPostComments, updateComment } from "./controllers/CommentsController.js"

const dbURL='mongodb+srv://memeguy:Wert2yh8g@kursachdb.0bh2ytq.mongodb.net/blog?retryWrites=true&w=majority';
mongoose.connect(dbURL)
    .then(() => { console.log("connected to mongodb") })
    .catch((error) => { console.log(error) });

const app = express()

const storage = multer.diskStorage({
    destination: (_, __, cb) => {
        cb(null, 'uploads')//папка куда буду загружаться картинки
    },
    filename: (_, file, cb) => {
        cb(null, file.originalname)
    }
})

const upload = multer({ storage });


app.use(express.json());
app.use('/uploads', express.static('uploads'));//для изображений
app.use(cors());
//auth
app.post('/auth/register', registerValidator, handleValidationErrors, register)
app.post('/auth/login', loginValidator, handleValidationErrors, login)
app.get('/auth/me', checkAuth, getMe)
//img
app.post('/upload', checkAuth, upload.single('image'), (req, res) => {
    res.json({
        url: `/uploads/${req.file.originalname}`
    })
});
//posts
app.get("/posts", getAll);
// app.get("/posts/tags",getLastTags);
app.get("/posts/:id", getOne);
app.post("/posts/:id", checkAuth, commentCreateValidator, handleValidationErrors, createComment);
app.post("/posts", checkAuth, postCreateValidator, handleValidationErrors, createPost);
app.delete("/posts/:id", checkAuth, deletePost);
app.patch("/posts/:id", checkAuth, postCreateValidator, handleValidationErrors, updatePost);
//comments
app.get("/comments/:id", getPostComments);
app.delete("/comments/:id", checkAuth, deleteComment);
app.patch("/comments/:id",checkAuth,updateComment);
//tag
app.get("/tags", getLastTags)
app.listen(4444, (err) => {
    if (err) {
        console.log(err);
    }
    else console.log("server working");
})