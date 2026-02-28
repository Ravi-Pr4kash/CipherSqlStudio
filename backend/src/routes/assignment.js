import express from "express";
import {getAssignments} from '../controllers/assignment.js'

const router = express.Router();

router.get('/', getAssignments)


export default router;