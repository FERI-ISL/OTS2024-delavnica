import express from 'express'
import cors from 'cors'

import predictController from './controllers/predict-controller.js'
import {createConnection, initializeDatabase} from "./connection.js";
import applicationsController from "./controllers/applications-controller.js";
import resumesController from "./controllers/resumes-controller.js";

const app = express()
const PORT = 5555

app.use(express.json())
app.use(cors())

app.use('/predict', predictController)
app.use('/applications', applicationsController)
app.use('/resumes', resumesController)

app.get('/', (_, res) => {
    res.send('Hello visitor!');
});

app.listen(PORT, () => {
    createConnection().then((value) => {
        initializeDatabase()
    })

    console.log(`Server is running on http://localhost:${PORT}`);
});