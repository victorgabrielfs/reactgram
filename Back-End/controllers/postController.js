const Post = require('../models/Post')
const mongoose = require('mongoose')
const User = require('../models/User')

const createPost = async (req, res) => {
	const { title } = req.body
	const image = req.file.filename

	const user = await User.findById(mongoose.Types.ObjectId(req.user._id)).select(
		'-password'
	)

	try {
		const post = await Post.create({
			image,
			title,
			userId: user.userId,
			userName: user.name
		})
		return res.status(201).json({ post })
	} catch (err) {
		return res.status(400).json({ error: err.message })
	}
}

const deletePost = async (req, res) => {
	const { userId } = req.user
	const { postId } = req.params

	try {
		const post = await Post.findById(mongoose.Types.ObjectId(postId)).select(
			'-password'
		)
		console.log(post.userId, mongoose.Types.ObjectId(userId))
		if (post.userId.equals(userId)) {
			await Post.findByIdAndDelete(postId)
			return res.status(200).json({ message: 'Post deleted' })
		} else {
			return res
				.status(400)
				.json({ error: 'You are not authorized to delete this post' })
		}
	} catch (err) {
		return res.status(400).json({ error: err.message })
	}
}

const getAllPosts = async (req, res) => {
	try {
		const posts = await Post.find().sort({ createdAt: -1 })
		return res.status(200).json({ posts })
	} catch (err) {
		return res.status(400).json({ error: err.message })
	}
}

const getPostsByUser = async (req, res) => {
	const { userId } = req.params
	if (!mongoose.Types.ObjectId.isValid(userId)) {
		return res.status(400).json({ error: 'Invalid user id' })
	}
	try {
		const posts = await Post.find({
			userId: mongoose.Types.ObjectId(userId)
		}).sort({
			createdAt: -1
		})
		return res.status(200).json({ posts })
	} catch (err) {
		return res.status(400).json({ error: err.message })
	}
}

const getPostById = async (req, res) => {
	const { id } = req.params
	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(400).json({ error: 'Invalid post id' })
	}
	try {
		const post = await Post.findById(mongoose.Types.ObjectId(id))
		return res.status(200).json({ post })
	} catch (err) {
		return res.status(400).json({ error: err.message })
	}
}

const updatePost = async (req, res) => {
	const { title } = req.body
	let image = null
	if (req.file) {
		image = req.file.filename
	}

	const { postId } = req.params
	const { id } = req.user

	try {
		const post = await Post.findById(mongoose.Types.ObjectId(postId))
		if (post.userId.equals(id)) {
			if (!(image || title)) {
				return res.status(400).json({ error: 'Nothing to update' })
			}
			if (title) {
				post.title = title
			}
			if (image) {
				post.image = image
			}
			await post.save()
			return res.status(200).json({ post })
		} else {
			return res
				.status(400)
				.json({ error: 'You are not authorized to update this post' })
		}
	} catch (err) {
		return res.status(400).json({ error: err.message })
	}
}

const likePost = async (req, res) => {
	const { postId } = req.params
	const { id } = req.user

	try {
		const post = await Post.findById(mongoose.Types.ObjectId(postId))
		if (post.likes.includes(id)) {
			return res.status(400).json({ error: 'Post already liked' })
		}
		post.likes.push(id)
		await post.save()
		return res.status(200).json({ post })
	} catch (err) {
		return res.status(400).json({ error: err.message })
	}
}
const unlikePost = async (req, res) => {
	const { postId } = req.params
	const { id } = req.user

	try {
		const post = await Post.findById(mongoose.Types.ObjectId(postId))
		if (!post.likes.includes(id)) {
			return res.status(400).json({ error: 'Post not liked' })
		}
		post.likes = post.likes.filter((like) => !(like === id))
		await post.save()
		return res.status(200).json({ post })
	} catch (err) {
		return res.status(400).json({ error: err.message })
	}
}

const commentPost = async (req, res) => {
	const { postId } = req.params
	const { id } = req.user
	const { comment } = req.body

	try {
		const post = await Post.findById(mongoose.Types.ObjectId(postId))
		const user = await User.findById(mongoose.Types.ObjectId(id)).select(
			'-password'
		)
		const newComment = {
			comment,
			userId: user._id,
			userName: user.name
		}
		post.comments.push(newComment)
		await post.save()
		return res.status(200).json({ post })
	} catch (err) {
		return res.status(400).json({ error: err.message })
	}
}

// const deleteComment = async (req, res) => {
// 	const { postId, commentId } = req.params
// 	const { id } = req.user

// 	try {
// 		const post = await Post.findById(mongoose.Types.ObjectId(postId))
// 		const comment = post.comments.find((comment) => comment._id == commentId)
// 		if (!comment) {
// 			return res.status(400).json({ error: 'Comment not found' })
// 		}
// 		if (comment.userId.equals(id)) {
// 			post.comments = post.comments.filter(
// 				(comment) => !(comment._id == commentId)
// 			)
// 			await post.save()
// 			return res.status(200).json({ post })
// 		} else {
// 			return res
// 				.status(400)
// 				.json({ error: 'You are not authorized to delete this comment' })
// 		}
// 	} catch (err) {
// 		return res.status(400).json({ error: err.message })
// 	}
// }

//search post by title
const searchPost = async (req, res) => {
	const { q } = req.query
	console.log('penis')
	if (!q) {
		return res.status(400).json({ error: 'Please enter a title' })
	}
	try {
		const posts = await Post.find({
			title: { $regex: q, $options: 'i' }
		}).exec()
		if (posts.length === 0) {
			return res.status(200).json({ result: 'No posts found' })
		}
		return res.status(200).json({ posts })
	} catch (err) {
		return res.status(400).json({ error: err.message })
	}
}

module.exports = {
	createPost,
	deletePost,
	getAllPosts,
	getPostById,
	getPostsByUser,
	updatePost,
	likePost,
	unlikePost,
	commentPost,
	searchPost
}
