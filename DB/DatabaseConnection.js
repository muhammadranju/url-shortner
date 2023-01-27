require("dotenv").config();
const mongoose = require("mongoose");

mongoose.set("strictQuery", false);
const MONGODB_CONNCTION = mongoose
    .connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("Database Connection Successfully"))
    .catch((err) => console.log(err));

module.exports = MONGODB_CONNCTION;
