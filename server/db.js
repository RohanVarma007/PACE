const mongoose = require('mongoose');

const runsConnection = mongoose.createConnection('mongodb://localhost:27017/runsDB');


const usersConnection = mongoose.createConnection('mongodb://localhost:27017/usersDB');
runsConnection.on('connected', () => {
    console.log('Connected to runsDB');
});

runsConnection.on('error', (err) => {
    console.error('Error connecting to runsDB', err);
});

usersConnection.on('connected', () => {
    console.log('Connected to usersDB');
});

usersConnection.on('error', (err) => {
    console.error('Error connecting to usersDB', err);
});

module.exports = { runsConnection, usersConnection };