import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: 'user'
    },
    root: {
        type: Boolean,
        default: false
    },
    avatar: {
        type: String,
        default: 'https://res-console.cloudinary.com/dydywnlxu/thumbnails/v1/image/upload/v1634206701/ZWNvbW1lcmNlIHByb2R1Y3RzL2V2ZW50LWRlZmF1bHRfd2R6bXdh/folder_thumbnail/d184OCxoXzg4LGNfdGh1bWI='
    }
}, {
    timestamps: true
})

export default mongoose.models.User || mongoose.model("User", userSchema)