import mongoose from 'mongoose'

const ResumesSchema = new mongoose.Schema({
    id: Number,
    resume: String
})

const ResumeModel = mongoose.model('Resume', ResumesSchema)

export default ResumeModel