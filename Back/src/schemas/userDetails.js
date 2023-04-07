
import mongoose from "mongoose";

const userDetailsSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        secret: {
            type: String,
            required: true
        }
    },
    {
        collection: "UserInfo",
    }
);

export default mongoose.model("UserInfo", userDetailsSchema)