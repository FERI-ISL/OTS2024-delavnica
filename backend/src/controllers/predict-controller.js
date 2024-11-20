import express from "express"
import {createInputs, predictEmployment, predictSalary} from "../models/model_utils.js"

const router = express.Router();

router.post('/employment', async (req, res) => {
    try {
        return res.json({'employment': NaN})
    } catch (err) {
        console.log('Employment error', err)
        return res.json({'employment': NaN})
    }
})

router.post('/salary', async (req, res) => {
    try {
        return res.json({'salary': NaN})
    } catch (err) {
        console.log('Salary error', err)
        return res.json({'salary': NaN})
    }
})

export default router