const mongoose = require('mongoose')
const { Schema } = mongoose

const postSchema = new Schema(
	{
		image: String,
		title: String,
		likes: Array,
		comments: Array,
		userId: mongoose.ObjectId,
		userName: String
	},
	{ timestamps: true }
)

const Post = mongoose.model('Image', postSchema)

module.exports = Post
