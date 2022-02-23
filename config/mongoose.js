const mongoose = require('mongoose');


mongoose.connect('mongodb://localhost/Git-Issue');

const db = mongoose.connection;

db.on('error', console.error.bind(console, "Error connecting MongoDB"));

db.once('open',function(){
    console.log(`Mongo-Db is Connected, the data can be stored now.`);
});

module.exports = db;
