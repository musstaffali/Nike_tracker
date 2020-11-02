const memory = require("../models");


module.exports = function (app) {
    //get workouts
    app.get("/api/workouts", (req, res) => {

        memory.Workout.find({}).then(memoryWorkout => {
            // console.log("ALL WORKOUTS");
            // console.log(memoryWorkout);
            memoryWorkout.forEach(workout => {
                var total = 0;
                workout.exercises.forEach(e => {
                    total += e.duration;
                });
                workout.totalDuration = total;

            });

            res.json(memoryWorkout);
        }).catch(err => {
            res.json(err);
        });
    });




    // add exercise using id
    app.put("/api/workouts/:id", (req, res) => {

        memory.Workout.updateOne(
            { _id: req.params.id },
            {
                $inc: { totalDuration: req.body.duration },
                $push: { exercises: req.body }
            },
            { new: true }).then(memoryWorkout => {
                res.json(memoryWorkout);
            }).catch(err => {
                res.json(err);
            });

    });

    //create workout
    app.post("/api/workouts", ({ body }, res) => {
        // console.log("WORKOUT TO BE ADDED");
        // console.log(body);

        memory.Workout.create(body).then((memoryWorkout => {
            res.json(memoryWorkout);
        })).catch(err => {
            res.json(err);
        });
    });

    // get workouts in range
    app.get("/api/workouts/range", (req, res) => {

        memory.Workout.find({}).then(memoryWorkout => {
            console.log("ALL WORKOUTS");
            console.log(memoryWorkout);

            res.json(memoryWorkout);
        }).catch(err => {
            res.json(err);
        });

    });


}
