const express = require('express')
const router = express.Router()
const authGuard = require('../middlewares/authGuard')
const validate = require('../middlewares/handleValidation')
const {
	postCreateValidation,
	postUpdateValidation,
	postCommentValidation
} = require('../middlewares/postValidation')
const {
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
} = require('../controllers/postController')
const imageUpload = require('../middlewares/imageUpload')

router.post(
	'/create',
	authGuard,
	imageUpload.single('image'),
	postCreateValidation(),
	validate,
	createPost
)
router.put(
	'/update/:postId',
	authGuard,
	postUpdateValidation(),
	imageUpload.single('image'),
	updatePost
)
router.put('/like/:postId', authGuard, likePost)
router.put('/unlike/:postId', authGuard, unlikePost)
router.put(
	'/comment/:postId',
	authGuard,
	postCommentValidation(),
	validate,
	commentPost
)
//router.put('/delete_comment/:postId/:commentId', authGuard, deleteComment)
router.get('/', authGuard, getAllPosts)
router.get('/search', authGuard, searchPost)
router.get('/:id', authGuard, getPostById)
router.get('/posts_user/:userId', authGuard, getPostsByUser)
router.delete('/delete/:postId', authGuard, deletePost)

module.exports = router
