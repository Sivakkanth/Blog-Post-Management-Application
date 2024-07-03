import mongoose, { Schema } from "mongoose";

const postSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
  },
{
  timestamps: true,
});

const PostModel = mongoose.models.PostModel || mongoose.model('PostModel', postSchema);

export default PostModel;