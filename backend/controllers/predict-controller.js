import express from "express";

const router = express.Router();

router.post('/employment', (req, res) => {
    try {
        const body = req.body

        return res.json({'employment': null})
    } catch (err) {
        console.log('Employment error', err)
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