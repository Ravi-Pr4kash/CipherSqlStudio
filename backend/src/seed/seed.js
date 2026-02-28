import mongoose from "mongoose";
import Assignment from '../models/model.js'
import 'dotenv/config'
import data from './data/questions.json' with { type: 'json' }


await mongoose.connect(process.env.DATABASE_URL);
console.log("connected to db");

await Assignment.deleteMany();
console.log("deleting existing data");

await Assignment.insertMany(data);
console.log("seeded the data");


