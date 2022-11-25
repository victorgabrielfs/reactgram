const mongoose = require('mongoose')

const dbUser = process.env.DB_USER
const dbPass = process.env.DB_PASS

const conn = async () => {
	try {
		const dbConn = await mongoose.connect(
			`mongodb+srv://${dbUser}:${dbPass}@cluster0.tnqbith.mongodb.net/?retryWrites=true&w=majority`
		)
		console.log(`MongoDB Connected: ${dbConn.connection.host}`)
	} catch (error) {
		console.log(error)
		process.exit(1)
	}
}

conn()

module.exports = conn
