const app = require('./app')
const { connectDB } = require('./db')
const { PORT } = require('./config')

const main = async () => {
  try {
    await connectDB()
    app.listen(PORT, () => console.log("Server on port",PORT))
  } catch (error) {
    console.log(error)
  }
}

main()