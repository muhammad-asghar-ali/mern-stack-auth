const Workout = require('../models/WorkoutModel')
const mongoose = require('mongoose')

module.exports.getAllWorkouts = async (req, res) => {
    try {
        // const allWorkouts = await Workout.find({}).sort({ createdAt: -1 }).lean()
        // if (!allWorkouts.length) {
        //     return res.status(200).json({ message: "No workout found" })
        // }
        const user_id = req.user._id

        const allWorkouts = await Workout.find({ user_id }).sort({ createdAt: -1 }).lean()
        res.status(200).json(allWorkouts)
    } catch (err) {
        res.status(500).json(err.message)
    }
}

module.exports.getWorkout = async (req, res, next) => {
    try {
        const { id } = req.params
        if (!id) {
            return res.status(400).json({ message: "Id is missing" })
        }
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ message: "No such workout found" })
        }
        const workout = await Workout.findById({ _id: id })
        if (!workout) {
            return res.status(404).json({ message: "No such workout found" })
        }
        res.status(200).json(workout)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

module.exports.createWorkout = async (req, res) => {
    try {
        const { title, reps, load } = req.body
        const user_id = req.user._id
        let emptyFields = []

        if (!title) {
            emptyFields.push('title')
        }
        if (!load) {
            emptyFields.push('load')
        }
        if (!reps) {
            emptyFields.push('reps')
        }
        if (emptyFields.length > 0) {
            return res.status(400).json({ message: 'Please fill in all fields', emptyFields })
        }

        const workout = await Workout.create({ title, reps, load, user_id })
        res.status(200).json(workout)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}

module.exports.deleteWorkout = async (req, res, next) => {
    try {
        const { id } = req.params
        if (!id) {
            return res.status(400).json({ message: "workout id is missing" })
        }
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ message: "No such workout" })
        }
        const workout = await Workout.findByIdAndDelete({ _id: id })
        if (!workout) {
            return res.status(404).json({ message: "No such workout" })
        }
        res.status(200).json(workout)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

module.exports.updateWorkout = async (req, res, next) => {
    try {
        const { id } = req.params
        const data = req.body
        if (!id) {
            return res.status(400).json({ message: "workout id is missing" })
        }
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ message: "No such workout" })
        }

        const workout = await Workout.findByIdAndUpdate({ _id: id }, {
            data
        })
        if (!workout) {
            return res.status(404).json({ message: "No such workout" })
        }
        res.status(200).json(workout)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}