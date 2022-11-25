require('dotenv').config()
require('./config/db')

const express = require('express')
const path = require('path')
const cors = require('cors')
const router = require('./routes/Router')
const port = process.env.PORT
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }))
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))
app.use(router)

app.listen(port, () => {
	console.log(`Server is running on port ${port}`)
})
