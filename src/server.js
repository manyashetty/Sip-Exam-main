import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';

import { router as user } from "./controller/userController.js"; 

const app = express();

mongoose.Promise = global.Promise;

const mongodbConnectionString = 'mongodb+srv://manu12shetty:Deyc1DXNoNtbF98f@cluster0.osr1gof.mongodb.net/examsip';

mongoose.connect(mongodbConnectionString, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

const db = mongoose.connection;

db.on('error', (error) => {
  console.error("Check your MongoDB. There is an issue:", error);
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use((req, res, next) => {
  console.log(`${new Date().toString()}: ${req.method} => ${req.originalUrl}`);
  next();
});

app.set('trust proxy', true);
app.use('/feedback', feedbackRouter);
app.get("/", (req, res) => {
  res.send('<a href="/auth/google">Login with Google</a>');
});

// Routes for authentication
app.use("/auth", user);

const server = http.createServer(app);

const PORT = 7000; 

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});













// import express from 'express';
// import http from 'http';
// import bodyParser from 'body-parser';
// import cors from 'cors';
// import mongo from 'mongoose';

// import { router as user } from "../controller/userController";


// const app = express();

// mongo.Promise = Promise;
// mongo.connect(process.env.MONGODB)
// const db = mongo.connection
// db.on('error', (error) => console.log("Check your mongodb please. There is an issue with mongodb."))
// db.on('open', () => console.log("Mongodb is connected."))
// app.use(express.json())

// app.use(express.urlencoded({ extended: true }));

// app.use((req, res, next) => {
//     console.log(`${new Date().toString()}: ${req.method}=> ${req.originalUrl}`);
//     next();
// });

// app.set('trust proxy', true);
// app.use(bodyParser.json());

// var server = http.createServer(app);

// app.get("/", async(req, res) => {
//     res.send('<a href="/auth/google">Login with Google</a>');
//     return
// })

// // // 
// app.use("/auth", user)


// server.listen(7000, () => console.log(`Server running at http://localhost:7000`));