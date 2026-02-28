import mongoose from 'mongoose'

const connectMongo = async () => {
   try {
    await  mongoose.connect(process.env.DATABASE_URL)
    console.log('Connected')
   } catch (error) {
    console.error("connection failed", error.message)
    process.exit(1);
   }
}

export default connectMongo