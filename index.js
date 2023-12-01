const express = require("express");
const {connectToMongo} = require("./connection.js")
const userRouter = require("./routes/user.js");
const {logger} = require("./middlewares/index.js")

const PORT = 8000;
const MONGO_URL = "";

connectToMongo(MONGO_URL);

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(logger('log.txt'));
app.use('/api/users', userRouter)

app.listen(PORT, () => console.log(`Server started at ${PORT}`));
