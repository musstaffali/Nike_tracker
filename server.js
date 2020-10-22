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

require("./routes/api-routes.js")(app);


// POST /api/workouts
// PUT /api/workouts/:id
// GET /api/workouts/range (Last 7 days: Think limit(7))


// HTML ROUTES
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public/index.html"));
});
app.get("/exercise", (req, res) => {
    res.sendFile(path.join(__dirname, "public/exercise.html"));
});
app.get("/stats", (req, res) => {
    res.sendFile(path.join(__dirname, "public/stats.html"));
});

app.listen(PORT, () => {
    console.log(`App is running on http://localhost:${PORT}!`);
});