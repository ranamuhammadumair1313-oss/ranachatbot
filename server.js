require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

app.post('/chat', async (req, res) => {
    try {
        const { message } = req.body;
        const response = await axios.post("https://openrouter.ai/api/v1/chat/completions", {
            model: process.env.MODEL_ID,
            messages: [{ role: "user", content: message }]
        }, {
            headers: {
                "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
                "Content-Type": "application/json"
            }
        });
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: "Server Error" });
    }
});

app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));
