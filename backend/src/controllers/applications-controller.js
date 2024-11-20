import express from "express";
import ApplicationModel from "../schemas/application.js";
import {createInputsEmployment, createInputsSalary, predictEmployment, predictSalary} from "../models/model_utils.js";

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const applications = await ApplicationModel.find({}, {_id: 0, __v: 0})

        return res.status(200).json({applications})
    } catch (err) {
        console.log('Employment error', err)
        res.status(500).json({message: err})
    }
})

router.post('/', async (req, res) => {
    try {
        const body = req.body
        
        const employmentInputs = createInputsEmployment(body)
        const employmentPrediction = await predictEmployment(employmentInputs)

        const salaryInputs = createInputsSalary(body)
        const salaryPrediction = await predictSalary(salaryInputs)

        const application = {...body}
        application.Employed = employmentPrediction
        application.ExpectedSalary = salaryPrediction

        const insertedAppplication = await ApplicationModel.create(application)

        return res.status(201).json(insertedAppplication)
    } catch (err) {
        console.log('Employment error', err)
        return res.status(500).json({message: err})
    }

})

export default router