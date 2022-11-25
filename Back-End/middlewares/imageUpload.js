const multer = require('multer')
const path = require('path')

const imageStorage = multer.diskStorage({
	destination: (req, file, cb) => {
		let folder = ''

		if (req.baseUrl.includes('users')) {
			folder = 'users'
		} else if (req.baseUrl.includes('posts')) {
			folder = 'photos'
		}
		cb(null, `uploads/${folder}`)
	},
	filename: (req, file, cb) => {
		cb(null, Date.now() + path.extname(file.originalname))
	}
})

const imageUpload = multer({
	storage: imageStorage,
	limits: { fileSize: 1000000 },
	fileFilter(req, file, cb) {
		if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
			cb(new Error('Only jpg, jpeg, and png files are allowed'))
		}
		cb(undefined, true)
	}
})

module.exports = imageUpload
