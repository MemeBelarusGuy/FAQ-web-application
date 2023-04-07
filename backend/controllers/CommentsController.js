import CommentModel from '../models/Comment.js'
export const getPostComments = async (req, res) => {
    try {
        const postId = req.params.id;
        const comments = await CommentModel.find({ postId });
        if (!comments) {
            return res.status(404).json({
                message: "Комментарии не найдены"
            })
        }
        res.json(comments);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Ошибка получения комментариев поста"
        })
    }
}
export const createComment = async (req, res) => {
    try {
        const postId = req.params.id;
        const doc = new CommentModel({
            postId,
            postedAt: Date.now(),
            author: req.body.author,
            text: req.body.text
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
export const deleteComment = async (req, res) => {
    try {
        const commentId = req.params.id;
        const doc = await CommentModel.findOneAndDelete({
            _id: commentId
        });
        if (!doc) {
            return res.status(404).json({
                message: "Комментарий не найден"
            })
        }
        res.json({
            message: "Комментарий удалён"
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Ошибка удаления комментария"
        })
    }
}
export const updateComment = async (req, res) => {
    try {
        const commentId = req.params.id;
        const doc = await CommentModel.findOneAndUpdate({
            _id: commentId
        }, {
            postedAt: Date.now(),
            author: req.body.author,
            text: req.body.text
        });
        if (!doc) {
            return res.status(404).json({
                message: "Не удалось обновить комментарий!"
            })
        }
        res.json({
            message:"Комментарий обновлён"
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Ошибка обновления комментария"
        })
    }
}