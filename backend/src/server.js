import app from './app.js';
import connectMongo from './config/db.js';
import 'dotenv/config'

const PORT = process.env.PORT

connectMongo()
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);   
})