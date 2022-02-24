const mongoose = require('mongoose');


mongoose.connect('mongodb://localhost/Git-Issue');
// const dbUrl = 'mongodb+srv://UsernameZero:UsernameZero@cluster0.oe1eg.mongodb.net/Git-Issue';
// mongoose.connect( dbUrl , {useNewUrlParser: true});

const db = mongoose.connection;

db.on('error', console.error.bind(console, "Error connecting to MongoDB"));

db.once('open',function(){
    console.log(`Mongo-Db is Connected, the data can be stored now.`);
});

module.exports = db;
