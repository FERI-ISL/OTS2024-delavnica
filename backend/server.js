import express from 'express'
const app = express()
const PORT = 5000
import cors from 'cors'

import predictController from './controllers/predict-controller.js'

app.use(express.json())
app.use(cors())

app.use('/predict', predictController)

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});