import mongoose from 'mongoose';

let isConnected = false

export const connectDB = async () => {
    mongoose.set('strictQuery', true)

    if (!process.env.MONGO_URI) return console.log("No MONGO_URI found")
    if (isConnected) return

    try {
        await mongoose.connect(process.env.MONGO_URI)

        isConnected = true

        console.log("Connected to mongodb")
    } catch (error) {
        console.log(error)
    }
}