const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/workoutController');
const { protect } = require('../middleware/auth');

router.use(protect);
router.post('/bmi', ctrl.getBMISuggestion);
router.get('/history', ctrl.getWorkoutHistory);     // ← MUST be before /logs/:id
router.get('/logs/:date', ctrl.getWorkouts);
router.post('/logs', ctrl.addWorkout);
router.put('/logs/:id', ctrl.updateWorkout);
router.delete('/logs/:id', ctrl.deleteWorkout);

module.exports = router;