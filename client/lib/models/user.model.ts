import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    id: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    name: { type: String },
    image: { type: String },
    banner: { type: String },
    bio: { type: String },
    location: { type: String },
    website: { type: String },
    verified: { type: Boolean , default: false },
    birthDate: { type: Date },
    hashes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Hash"
        }
    ],
    onBoarded: { type: Boolean, default: false },
    following: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    followers: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    communities: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Community"
        }
    ],
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Hash"
        }
    ]
})

const User = mongoose.models.User || mongoose.model("User", userSchema)

export default User