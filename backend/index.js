const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const ConnectDatabase = require('./Connection/connection');
const userRoutes = require('./Routes/userRoutes');


app.use(express.json());
dotenv.config()
app.use(cors());
ConnectDatabase();

app.use("/api/user", userRoutes);
// app.use("/api/images", imageRoutes);


const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server in running on ${PORT}`));
