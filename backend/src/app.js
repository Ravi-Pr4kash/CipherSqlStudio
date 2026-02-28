import errorHandler from "./middleware/ErrMiddleware.js";
import assignmentRouter from './routes/assignment.js'
import express from 'express'
import cors from 'cors'
import runRouter from './routes/run.js'

const app = express()
app.use(cors())
app.use(express.json())

app.use('/api/v1/assignments', assignmentRouter)
app.use('/api/v1/run' , runRouter)
app.use(errorHandler)

export default app;