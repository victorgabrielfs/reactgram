const express = require('express')
const router = express.Router()

router.use('/api/users', require('./UserRouter'))
router.use('/api/posts', require('./PostRouter'))

router.get('/', (req, res) => {
	res.send('Hello World!')
})

app.get('*', function (req, res) {
	res.send('what???', 404)
})

module.exports = router
