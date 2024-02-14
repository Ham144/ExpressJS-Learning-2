import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    userName: {
        type: mongoose.Schema.Types.String,
        required: true,
    },
    age: mongoose.Schema.Types.Number,
    password: {
        type: mongoose.Schema.Types.String,
        required: true
    }
})

export const User = mongoose.model("user", UserSchema)
