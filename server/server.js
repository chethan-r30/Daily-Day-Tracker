const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const connectDB = require('./config/db');

dotenv.config();

const app = express();

const allowedOrigins = [
  'https://daily-day-tracker-1.onrender.com',
  'http://localhost:3000'
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) return callback(null, true);
    return callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  optionsSuccessStatus: 200
};

// CORS FIRST
app.use(cors(corsOptions));

// Preflight for all routes
app.options(/.*/, cors(corsOptions));

// Parsers after CORS
app.use(express.json());

// Test route
app.get('/api/auth/ping', (req, res) => {
  res.json({ ok: true });
});

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/activities', require('./routes/activityRoutes'));
app.use('/api/workouts', require('./routes/workoutRoutes'));
app.use('/api/study', require('./routes/studyRoutes'));
app.use('/api/timetable', require('./routes/timetableRoutes'));
app.use('/api/whatsnew', require('./routes/whatsNewRoutes'));

app.get('/', (req, res) => res.send('Daily Tracker API is running'));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
  app.get('/{*splat}', (req, res) =>
    res.sendFile(path.resolve(__dirname, '../client', 'build', 'index.html'))
  );
}

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