import mongoose from "mongoose";

const tagSchema = new mongoose.Schema({
    tag: { type: String, required: true, unique: true },
    count: { type: Number, default: 0, required: true },
    createdAt: { type: Date, default: Date.now },
    lastUsed: { type: Date, default: Date.now },
})

const Tag = mongoose.models.Tag || mongoose.model("Tag", tagSchema)

export default Tag;