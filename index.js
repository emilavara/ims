import 'dotenv/config'
import mongoose from 'mongoose'
import app from './app.js'

//l33t port
const port = process.env.PORT || 1337;

//start the app and boot the api when mongodb gives ok
async function start() {
  console.log('ims initialized.');

  try {
    await mongoose.connect(process.env.MONGODB_URI)
    console.log('mongodb connected.')
    app.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`)
    })
  } catch (err) {
    console.error('MongoDB connection error:', err.message)
    process.exit(1)
  }
}

start()

export default app;