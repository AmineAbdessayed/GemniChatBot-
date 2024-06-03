const express= require("express");
const dotenv=require("dotenv")

dotenv.config()

const router = express.Router();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
  
  router.post("/chat", async(req,res)=> {

    try {

    const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        "role": "user",
        "content": ""
      }
    ],
    temperature: 1,
    max_tokens: 256,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });
  

    }catch(err){
        res.status(500).send(err)

    }
  
  })

  
  