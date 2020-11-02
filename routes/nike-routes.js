const memory = require("../models");


module.exports = function (doit) {

    doit.get("/api/workouts", (req, res) => {

        memory.Workout.find({}).then(memoryWorkout => {

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
    doit.put("/api/workouts/:id", (req, res) => {

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
    doit.post("/api/workouts", ({ body }, res) => {


        memory.Workout.create(body).then((memoryWorkout => {
            res.json(memoryWorkout);
        })).catch(err => {
            res.json(err);
        });
    });


    doit.get("/api/workouts/range", (req, res) => {

        memory.Workout.find({}).then(memoryWorkout => {
            console.log("ALL WORKOUTS");
            console.log(memoryWorkout);

            res.json(memoryWorkout);
        }).catch(err => {
            res.json(err);
        });

    });


}
