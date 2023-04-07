import mongoose from "mongoose"

const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        unique: true,
        required: true
    },
    text: {
        type: String,
        unique: true,
        required: true
    },
    tags: {
        type: Array,
        default: []
    },
    viewsCount: {
        type: Number,
        default: 0
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"//отсюда вытаскивается пользователь
    },
    comments:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Post"
    },
    imageUrl: {
        type: String
    }
}, { timestamps: true });
export default mongoose.model("Post", PostSchema);