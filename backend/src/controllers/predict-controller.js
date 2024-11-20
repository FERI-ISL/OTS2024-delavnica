import express from "express"
import {createInputs, predictEmployment, predictSalary} from "../models/model_utils.js"

const router = express.Router();

router.post('/employment', async (req, res) => {
    try {
        const body = req.body
        const inputs = createInputs(body)
        const prediction = await predictEmployment(inputs)

        return res.json({'employment': prediction})
    } catch (err) {
        console.log('Employment error', err)
        return res.json({'employment': NaN})
    }
})

router.post('/salary', async (req, res) => {
    try {
        const body = req.body
        const inputs = createInputs(body)
        const prediction = await predictSalary(inputs)

        return res.json({'salary': prediction})
    } catch (err) {
        console.log('Salary error', err)
        return res.json({'salary': NaN})
    }
})

export default router