const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();

const app = express();
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(express.json());

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/activities', require('./routes/activityRoutes'));
app.use('/api/workouts', require('./routes/workoutRoutes'));
app.use('/api/study', require('./routes/studyRoutes'));
app.use('/api/timetable', require('./routes/timetableRoutes'));
app.use('/api/whatsnew', require('./routes/whatsNewRoutes')); 

app.get('/', (req, res) => res.send('Daily Tracker API is running'));

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (err) {
    console.error('Failed to start server:', err.message);
    process.exit(1);
  }
};

startServer();