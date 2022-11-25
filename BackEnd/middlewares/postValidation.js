const { body } = require('express-validator')

const postCreateValidation = () => {
	return [
		body('title')
			.not()
			.equals('undefined')
			.withMessage('Title is required')
			.isString()
			.withMessage('Title must be a string')
			.isLength({ min: 3 })
			.withMessage('Title must be at least 3 characters long'),
		body('image').custom((value, { req }) => {
			if (!req.file) {
				throw new Error('Image is required')
			}
			return true
		})
	]
}

const postUpdateValidation = () => {
	return [
		body('title')
			.not()
			.equals('undefined')
			.withMessage('Title is required')
			.isString()
			.withMessage('Title must be a string')
			.isLength({ min: 3 })
			.withMessage('Title must be at least 3 characters long')
	]
}

const postCommentValidation = () => {
	return [
		body('comment')
			.not()
			.equals('undefined')
			.withMessage('Comment is required')
			.isString()
			.withMessage('Comment must be a string')
			.isLength({ min: 3 })
			.withMessage('Comment must be at least 3 characters long')
	]
}

module.exports = {
	postCreateValidation,
	postUpdateValidation,
	postCommentValidation
}
