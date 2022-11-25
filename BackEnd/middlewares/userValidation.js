const { body } = require('express-validator')

const userCreateValidation = () => {
	return [
		body('name')
			.notEmpty()
			.withMessage('Name is required')
			.isLength({ min: 3 })
			.withMessage('Name must be at least 3 characters long'),
		body('email')
			.notEmpty()
			.withMessage('Email is required')
			.isEmail()
			.withMessage('Email is invalid'),
		body('password')
			.notEmpty()
			.withMessage('Password is required')
			.isLength({ min: 6 })
			.withMessage('Password must be at least 6 characters long')
	]
}

const userLoginValidation = () => {
	return [
		body('email')
			.notEmpty()
			.withMessage('Email is required')
			.isEmail()
			.withMessage('Email is invalid'),
		body('password').notEmpty().withMessage('Password is required')
	]
}

const userUpdateValidation = () => {
	return [
		body('name')
			.optional()
			.isLength({ min: 3 })
			.withMessage('Name must be at least 3 characters long'),
		body('email').optional().isEmail().withMessage('Email is invalid'),
		body('password')
			.optional()
			.isLength({ min: 6 })
			.withMessage('Password must be at least 6 characters long')
	]
}

module.exports = {
	userCreateValidation,
	userLoginValidation,
	userUpdateValidation
}
