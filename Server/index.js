const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();


const app = express();

app.use(cors());
app.use(express.json());
const { GoogleGenerativeAI } = require("@google/generative-ai");


const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEN_AI_KEY);

app.post('/gemini', async (req, res) => {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-pro"});
        const chat = model.startChat({
            history: [
                {
                  role: "user",
                  parts: [{ text: "Hello, I have 2 dogs in my house." }],
                },
                {
                  role: "model",
                  parts: [{ text: "Great to meet you. What would you like to know?" }],
                },
              ],        });
        const msg = req.body.message;
        const result = await chat.sendMessage(msg);
        const response = await result.response;
        const text = response.text();   
        res.send(text);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
