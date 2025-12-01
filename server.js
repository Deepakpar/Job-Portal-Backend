const mongoose = require('mongoose');
const { MONGODB_URI } = require('./utils/config');



mongoose
    .connect(MONGODB_URI)
    .then(()=>{
        console.log('Connected to MONGODB');
    })
    .catch(error=>{
        console.error('Error connecting to MONGODB:', error.message);
    })