const mongoose = require('mongoose');

mongoose.connect(process.env.Mongodb_URI);

mongoose.connection.on('connected', () => {
  console.log('Connected to runsDB');
});

mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

module.exports = mongoose;