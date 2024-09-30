const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const app = express()

app.use(cors())

dotenv.config()

app.get('/clientID', (req, res) => {

    try {
        res.status(200).json({ clientID: process.env.CLIENT_ID });
    } catch (e) {
        res.status(500).send()
    }
})


const server = app.listen(4000, () => {
    console.log(`server is running on port 4000`)
})