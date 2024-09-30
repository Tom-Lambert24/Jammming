const express = require('express');
const dotenv = require('dotenv')
const cors = require('cors')

const app = express();
const port = 5000;
dotenv.config()

app.use(cors())

const clientID = process.env.CLIENT_ID;
const clientSecret = process.env.CLIEND_SECRET;
const redirectURI = 'http://localhost:3000/PlayLister';
console.log(clientID)
app.get('/getClientID', (req, res) => {
    try {
        res.status(200).json({ clientID }); // Send as a JSON object
    } catch (e) {
        console.error(e);
        res.status(500).send();
    }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});