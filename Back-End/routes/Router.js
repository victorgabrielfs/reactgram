const express = require('express')
const router = express.Router()

router.use('/api/users', require('./UserRouter'))
router.use('/api/posts', require('./PostRouter'))

router.get('/', (req, res) => {
	res.send('Hello World!')
})

module.exports = router
