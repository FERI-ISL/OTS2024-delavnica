import express from "express";
import ApplicationModel from "../schemas/application.js";
import {createInputs, predictEmployment, predictSalary} from "../models/model_utils.js";

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
    
})

export default router