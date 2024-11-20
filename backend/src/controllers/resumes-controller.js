import express from "express";
import ResumesModel from "../schemas/resumes.js";

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const resumes = await ResumesModel.find({}, {_id: 0, __v: 0})

        return res.status(200).json({resumes})
    } catch (err) {
        console.log('Resumes error', err)
        res.status(500).json({message: err})
    }
})

export default router