import 'dotenv/config'
import mongoose from 'mongoose'
import app from './app.js'
import { initGraphQL } from './graphql/server/index.js'

const port = process.env.PORT || 1337; //l33t

//start the app and boot the api when mongodb gives ok
async function start() {
  console.log('ims initialized.');

  try {
    await mongoose.connect(process.env.MONGODB_URI)
    console.log('mongodb connected.')

    // Initialize GraphQL
    await initGraphQL(app)
    console.log('GraphQL endpoints ready.')
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
