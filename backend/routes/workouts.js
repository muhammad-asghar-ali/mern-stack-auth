const express = require('express')
const router = express.Router()
const workoutController = require('../controllers/workoutController')
const requireAuth = require('../middleware/requireAuth')

// require auth for all workout routes
router.use(requireAuth)
router.get('/', workoutController.getAllWorkouts)

router.get('/:id', workoutController.getWorkout)

router.post('/', workoutController.createWorkout)

router.delete('/:id', workoutController.deleteWorkout)

router.patch('/:id', workoutController.updateWorkout)

module.exports = router