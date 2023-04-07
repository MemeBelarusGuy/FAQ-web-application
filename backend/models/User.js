import mongoose from "mongoose"

const UserSchema = new mongoose.Schema({
    fullName: {
        type: String,
        unique: true,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    passwordHash: {
        type: String,
        required: true
    },
    avatarUrl: {
        type: String,
    }
}, { timestamps: true });
export default mongoose.model("User", UserSchema);