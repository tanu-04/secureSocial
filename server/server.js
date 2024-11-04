const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cors = require("cors");
const { GoogleGenerativeAI } = require("@google/generative-ai");

dotenv.config();

const app = express();
const genAi = new GoogleGenerativeAI(process.env.API_KEY);

app.use(cors());
app.use(bodyParser.json());

app.get("/geminiQuery", (req, res) => {
  async function run() {
    try {
      const model = genAi.getGenerativeModel({ model: "gemini-1.5-flash" });
      const query = req.query.items;
      const result = await model.generateContent(query);

      const responseContent = await result.response.text();
      console.log(responseContent);

      res.status(200).send(responseContent);
    } catch (error) {
      res.status(500).send("Error generating content: " + error.message);
    }
  }

  run();
});

app.get("/testQuery", (req, res) => {
  const aiQuery = req.query.items;
  console.log("request text : " + JSON.stringify(aiQuery));
  res.send("backend is running !");
});

const port = process.env.port || 8080;

app.listen(port, () => {
  console.log("server is running on port " + port);
});
