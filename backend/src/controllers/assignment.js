import Assignment from '../models/model.js'

export const getAssignments = async (req,res, next) => {
    try {
    const assignments = await Assignment.find()
    return res.status(200).json({ assignments })
    } catch (error) {
        next(error)
    }
}

