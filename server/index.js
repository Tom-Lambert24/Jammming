const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const querystring = require('querystring');
const axios = require('axios');
const helmet = require('helmet')
const path = require('path')

const app = express();
const PORT = process.env.PORT || 5000;
dotenv.config();

const corsOptions = {
    origin: 'https://playlister-portfolio-1c5c28cc9523.herokuapp.com',
    methods: ['GET', 'POST'],
    credentials: true,
};
app.use(cors(corsOptions));

app.use(express.json());
app.use(helmet())
app.use(express.static(path.resolve(__dirname, "../build")))

const clientID = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;
const redirectURI = 'https://playlister-portfolio-1c5c28cc9523.herokuapp.com/callback';
console.log(clientID);

app.get('/getClientID', (req, res) => {
    try {
        res.status(200).json({ clientID }); // Send as a JSON object
    } catch (e) {
        console.error(e);
        res.status(500).send();
    }
});

app.post('/callback', async function(req, res) {
    const code = req.body.code;

    if (!code) {
        return res.status(400).send('No code provided');
    }

    try {
        const authOptions = {
            url: 'https://accounts.spotify.com/api/token',
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic ' + Buffer.from(`${clientID}:${client_secret}`).toString('base64'),
            },
            data: querystring.stringify({
                code: code,
                redirect_uri: redirectURI,
                grant_type: 'authorization_code',
            }),
        };

        const response = await axios(authOptions);
        console.log('Access Token:', response.data.access_token);
        
        // Return the access token to the frontend
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching access token:', error);
        res.status(500).send('Error retrieving access token');
    }
});

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, "../build", 'index.html'))
})

app.listen(PORT, () => {
    console.log(`Server running at port:${PORT}`);
});