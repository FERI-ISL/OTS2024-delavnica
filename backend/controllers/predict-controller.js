import express from "express"
import {createInputsEmployment, predictEmployment} from "../models/model_utils.js"

const router = express.Router();

router.post('/employment', async (req, res) => {
    try {
        const body = req.body

        const inputs = createInputsEmployment(body)

        const prediction = await predictEmployment(inputs)

        return res.json({'employment': prediction})
    } catch (err) {
        console.log('Employment error', err)
        return res.json({'employment': NaN})
    }
})

router.post('/salary', (req, res) => {
    try {
        const body = req.body

        return res.json({'salary': null})
    } catch (err) {
        console.log('Salary error', err)
    }

})

export default router