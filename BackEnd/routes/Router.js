const express = require('express')
const router = express.Router()

router.use('/api/users', require('./UserRouter'))
router.use('/api/posts', require('./PostRouter'))

router.get('/', (req, res) => {
	res.send('Hello World!')
})

router.get('*', function (req, res) {
	res.status(404).send('what???')
})

module.exports = router
