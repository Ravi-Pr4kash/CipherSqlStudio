import  {runQuery } from '../controllers/run.js'
import express from 'express'


const router = express.Router()

router.post("/", runQuery)

export default router