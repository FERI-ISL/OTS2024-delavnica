import mongoose from 'mongoose'

const ApplicationSchema = new mongoose.Schema({
    Age: String,
    Accessibility: String,
    EdLevel: String,
    Employment: String,
    Gender: String,
    MentalHealth: String,
    MainBranch: String,
    YearsCode: Number,
    YearsCodePro: Number,
    Country: String,
    ComputerSkills: Number,
    Employed: Number,
    ExpectedSalary: Number
})

const ApplicationModel = mongoose.model('Application', ApplicationSchema)

export default ApplicationModel