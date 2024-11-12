// const express = require("express");
// const mongoose = require("mongoose");
// const dotenv = require("dotenv");
// const bodyParser = require("body-parser");
// const cors = require("cors");
// const { GoogleGenerativeAI } = require("@google/generative-ai");
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
// users = [];

// dotenv.config();

// const app = express();
// const genAi = new GoogleGenerativeAI(process.env.API_KEY);
// const saltRounds = 10;
// // const users = [
// //   {
// //     username: "Shantanu",
// //     password: "$2b$10$U0LZU/OxgNTzLhVj6d9Zqu4ul84wgkuwUJWnYnf6kssqeTGW5rMIS",
// //   },
// //   {
// //     username: "Tanushree",
// //     password: "$2b$10$kIeHJwbWKlngzINOgG2AluUp2nfLLtWv34io4xjjaKoTIHPUX/dea",
// //   },
// // ];
// const SECRET_KEY = "secret";

// app.use(cors());
// app.use(bodyParser.json());
// app.set("view engine", "ejs"); // Replace 'ejs' with your templating engine

// app.post("/register", async (req, res) => {
//   try {
//     const { username, password } = req.body;

//     const extinguisher = users.find((user) => user.username === username);
//     if (extinguisher) {
//       console.log("your user : " + JSON.stringify(extinguisher));
//       return res.status(400).json({ message: "user already exists !" });
//     }

//     const hashedPassword = await bcrypt.hash(password, saltRounds);

//     const user = { username: username, password: hashedPassword };
//     users.push(user);

//     res.status(201).json({ message: "user registered Successfully !" });
//     console.log("users : " + JSON.stringify(users));
//   } catch (err) {
//     res.status(500).json({ message: "Error registering user! : " + err });
//   }
// });

// app.post("/login", async (req, res) => {
//   console.log("login route hit !");
//   try {
//     const { username, password } = req.body;

//     const user = users.find((user) => user.username === username);
//     if (user) {
//       console.log("user found");
//       const passMatch = await bcrypt.compare(password, user.password);
//       if (passMatch) {
//         console.log("user authenticated !");
//         const token = jwt.sign({ username: user.username }, SECRET_KEY, {
//           expiresIn: "1h",
//         });
//         console.log("jwt token : " + JSON.stringify(token));
//         res.status(200).json({ message: "success logging in!", token: token });
//       } else {
//         console.log("wrong password !");
//         res.status(400).json({ message: "wrong password bro" });
//       }
//     } else {
//       console.log(
//         "username does not exist, redirect to login page! : " +
//           JSON.stringify(user) +
//           " username : " +
//           JSON.stringify(username)
//       );
//       res.status(404).json({ message: "no user, register first!" });
//     }
//   } catch (err) {
//     console.log("issue while logging in : " + err);
//   }
// });

// const authenticateToken = (req, res, next) => {
//   const authHeader = req.headers.authorization;
//   const token = authHeader && authHeader.split(" ")[1];

//   if (!token)
//     return res
//       .status(401)
//       .json({ message: "user not authorized. no token. login first." });

//   jwt.verify(token, SECRET_KEY, (err, user) => {
//     if (err) {
//       console.log("error : " + err);
//       res.redirect("/login");
//     } else {
//       console.log("token succ: " + token);
//       req.user = user;
//       next();
//     }
//   });
// };

// app.get("/chatbot", authenticateToken, (req, res) => {
//   console.log("entered here");
//   // res.json({ message: "this is a protected route", user: req.user });
//   res.status(200).json({ user: req.user });
// });

// app.get("/geminiQuery", (req, res) => {
//   async function run() {
//     try {
//       const model = genAi.getGenerativeModel({ model: "gemini-1.5-flash" });
//       const query = req.query.items;
//       const result = await model.generateContent(query);

//       const responseContent = await result.response.text();
//       console.log(responseContent);

//       res.status(200).send(responseContent);
//     } catch (error) {
//       res.status(500).send("Error generating content: " + error.message);
//     }
//   }

//   run();
// });

// app.get("/testQuery", (req, res) => {
//   const aiQuery = req.query.items;
//   console.log("request text : " + JSON.stringify(aiQuery));
//   res.send("backend is running !");
// });

// const port = process.env.port || 8080;

// app.listen(port, () => {
//   console.log("server is running on port " + port);
// });

// server.js
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/authRoutes");
const postRoutes = require("./routes/postRoutes");
const commentRoutes = require("./routes/commentRoutes");
const geminiRoutes = require("./routes/geminiRoutes");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// const genAi = new GoogleGenerativeAI(process.env.API_KEY);
const saltRounds = 10;
const SECRET_KEY = "secret";

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  if (!token)
    return res
      .status(401)
      .json({ message: "user not authorized. no token. login first." });

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) {
      console.log("error : " + err);
      res.redirect("/login");
    } else {
      console.log("token succ: " + token);
      req.user = user;
      next();
    }
  });
};

dotenv.config();
const app = express();

app.use(cors());
app.use(bodyParser.json());

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("MongoDB connection error:", error));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);
// app.use("/api/ai/geminiQuery", geminiRoutes);

app.get("/chatbot", authenticateToken, (req, res) => {
  console.log("entered here");
  // res.json({ message: "this is a protected route", user: req.user });
  res.status(200).json({ user: req.user });
});

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

// app.post("/createPost", (req, res) => {
//   try {
//     const reqBody = req.body;
//     console.log(JSON.stringify(reqBody));
//   } catch (err) {
//     console.log("error in creating post on the backend side : " + err);
//   }
// });

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
