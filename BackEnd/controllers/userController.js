const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')

const jwtSecret = process.env.JWT_SECRET
const generateToken = (id) => {
	return jwt.sign({ id }, jwtSecret, { expiresIn: '7d' })
}

const register = async (req, res) => {
	const { name, email, password } = req.body

	if (await User.findOne({ email })) {
		return res.status(400).json({ error: 'User already exists' })
	} else {
		try {
			const salt = await bcrypt.genSalt()
			const hashedPassword = await bcrypt.hash(password, salt)
			const user = await User.create({ name, email, password: hashedPassword })
			const token = generateToken(user._id)
			return res.status(201).json({ _id: user._id, token })
		} catch (err) {
			return res.status(400).json({ error: err.message })
		}
	}
}

const login = async (req, res) => {
	console.log(req.body)
	const { email, password } = req.body

	const user = await User.findOne({ email })
	if (!user) {
		return res.status(400).json({ error: 'User does not exist' })
	} else {
		const isMatch = await bcrypt.compare(password, user.password)
		if (!isMatch) {
			return res.status(400).json({ error: 'Invalid credentials' })
		} else {
			const token = generateToken(user._id)
			return res.status(200).json({ _id: user._id, token })
		}
	}
}

const getUser = async (req, res) => {
	const user = req.user
	return res.status(200).json({ user })
}

const update = async (req, res) => {
	const { name, email, bio, password } = req.body
	let profileImage = ''

	if (req.file) {
		profileImage = req.file.filename
	}

	const user = await User.findById(req.user._id).select('-password')

	if (email && email !== user.email && (await User.findOne({ email }))) {
		return res.status(400).json({ error: 'Email already exists' })
	} else if (email) {
		user.email = email
	}

	if (name) {
		user.name = name
	}

	if (bio) {
		user.bio = bio
	}

	if (profileImage) {
		user.profilePic = profileImage
	}

	if (password) {
		const salt = await bcrypt.genSalt()
		const hashedPassword = await bcrypt.hash(password, salt)
		user.password = hashedPassword
	}

	try {
		await user.save()
		return res.status(200).json({ user })
	} catch (err) {
		return res.status(400).json({ error: err.message })
	}
}

const getUserById = async (req, res) => {
	const { id } = req.params
	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(400).json({ error: 'Invalid user id' })
	}
	try {
		const user = await User.findById(mongoose.Types.ObjectId(id)).select(
			'-password'
		)

		if (!user) {
			return res.status(404).json({ error: 'User not found' })
		}
		return res.status(200).json({ user })
	} catch (err) {
		return res.status(400).json({ error: err.message })
	}
}

module.exports = { register, login, getUser, getUserById, update }
