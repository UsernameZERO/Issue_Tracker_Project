const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        unique: true,
    },
    descriptionForP: {
        type: String
    },
    authorForP :{
        type: String,
        required: true,
    },
    labels :[
        {
            type: String
        }
    ],
    issues :[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:'Issue'
        }
    ]

},{timestamps: true});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;