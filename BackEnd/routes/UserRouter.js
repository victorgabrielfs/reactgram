const express = require('express')
const router = express.Router()
const {
	register,
	login,
	getUser,
	update,
	getUserById
} = require('../controllers/userController')
const authGuard = require('../middlewares/authGuard')
const validate = require('../middlewares/handleValidation')
const imageUpload = require('../middlewares/imageUpload')
const {
	userCreateValidation,
	userLoginValidation,
	userUpdateValidation
} = require('../middlewares/userValidation')

router.post('/register', userCreateValidation(), validate, register)
router.post('/login', userLoginValidation(), validate, login)

router.get('/get_user', authGuard, getUser)
router.get('/get_user/:id', authGuard, getUserById)

router.put(
	'/update',
	authGuard,
	imageUpload.single('profilePic'),
	userUpdateValidation(),
	validate,
	update
)
module.exports = router
