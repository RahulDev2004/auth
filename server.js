require('dotenv').config({path: "./config.env"});

const express = require('express')
const connectDB = require('./config/db');

connectDB();

const app = express();

app.use(express.json());

app.use("/api/auth", require('./routes/auth'));

const PORT = process.env.PORT;

const server = app.listen(PORT, () => console.log(`server running on port ${PORT}`));

process.on("unhandledRejection", (err, promise) => {
    console.log(`Logged Error: ${err}`);
    server.close(() => process.exit(1));
});

