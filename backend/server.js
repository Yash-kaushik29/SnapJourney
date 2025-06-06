const express = require("express")
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cookieParser = require('cookie-parser');
const colors = require("colors");
const bodyParser = require("body-parser");
const authRoutes = require('./routes/authRoutes');
const searchRoutes = require('./routes/SearchRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();
dotenv.config();

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(cookieParser());
app.use(bodyParser.json());

app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:3000"],
    methods: ["POST", "PUT", "GET", "DELETE"],
  })
);

mongoose
  .connect(process.env.MONGODB_URI_KEY, {
    dbName: "doordash",
  })
  .then(() => {
    console.log("Database connected".yellow.bold);
  })
  .catch((err) => {
    console.log(err.red);
  });

app.use('/api/auth', authRoutes);
app.use('/api/search', searchRoutes);
app.use('/api/user', userRoutes);

app.listen(5000, () => {
  console.log("Server is running on PORT 5000".blue)
})