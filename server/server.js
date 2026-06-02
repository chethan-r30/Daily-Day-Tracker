const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();

const app = express();

// Body parser
app.use(express.json());

// ✅ CORS — allow Render frontend and local dev with function-based origin check
const allowedOrigins = [
  'https://daily-day-tracker-1.onrender.com',
  'http://localhost:3000'
];

const corsOptions = {
  origin: (origin, callback) => {
    // Allow requests with no origin (e.g., server-to-server, curl)
    if (!origin) return callback(null, true);
    const allowed = allowedOrigins.includes(origin);
    // callback expects (err, allow). Pass null error and boolean allow.
    return callback(null, allowed);
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};
// Simple CORS middleware that sets headers for allowed origins and handles preflight
app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (origin && allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');
  }

  if (req.method === 'OPTIONS') {
    return res.sendStatus(204);
  }

  next();
});

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/activities', require('./routes/activityRoutes'));
app.use('/api/workouts', require('./routes/workoutRoutes'));
app.use('/api/study', require('./routes/studyRoutes'));
app.use('/api/timetable', require('./routes/timetableRoutes'));
app.use('/api/whatsnew', require('./routes/whatsNewRoutes')); 

app.get('/', (req, res) => res.send('Daily Tracker API is running'));

const path = require('path');

// Serve React frontend in production
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