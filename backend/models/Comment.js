import mongoose from "mongoose"

const CommentSchema = new mongoose.Schema({
    postId: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    postedAt: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    }
}, { timestamps: true });
export default mongoose.model("Comment", CommentSchema);