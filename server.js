const express = require("express")
const mongoose = require("mongoose");
const path = require("path");
const logger = require("morgan");


const PORT = process.env.PORT || 3000
const app = express();
app.use(logger("dev"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/dbExample", { useNewUrlParser: true });

// API ROUTES
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/dbExample", { useNewUrlParser: true });

require("./routes/nike-routes.js")(app);


// HTML ROUTES -> index.html
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public/index.html"));
});

// HTML ROUTES --> excercise.html
app.get("/exercise", (req, res) => {
    res.sendFile(path.join(__dirname, "public/exercise.html"));
});

// HTML ROUTES --> stats.html
app.get("/stats", (req, res) => {
    res.sendFile(path.join(__dirname, "public/stats.html"));
});
app.listen(PORT, () => {
    console.log(`App is running on http://localhost:${PORT}!`);
});