const jwt = require('jsonwebtoken')
const User = require('../models/User')
const jwtSecret = process.env.JWT_SECRET

const authGuard = async (req, res, next) => {
	try {
		const token = req.header('Authorization').replace('Bearer ', '')
		const decoded = jwt.verify(token, jwtSecret)
		const user = await User.findById(decoded.id).select('-password')
		if (!user) {
			throw new Error()
		}
		req.token = token
		req.user = user
		next()
	} catch (err) {
		res.status(401).json({ error: 'Please authenticate' })
	}
}

module.exports = authGuard
