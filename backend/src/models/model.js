import mongoose from "mongoose";

const columnSchema = new mongoose.Schema({
    columnName: { type: String, required: true },
    dataType: { type: String, enum: ['INTEGER', 'TEXT', 'REAL'], required: true }
})

const sampleTableSchema = new mongoose.Schema({
    tableName: { type: String, required: true },
    columns: [columnSchema],
    rows: [mongoose.Schema.Types.Mixed]
})

const assignmentSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    question: { type: String, requred: true },
    sampleTables: [sampleTableSchema],
    expectedOutput: {
        type: { type: String, enum: ['table', 'single_value', 'column'] },
        value: mongoose.Schema.Types.Mixed
    }
}, { timestamps: true })

export default mongoose.model('Assignment',assignmentSchema)