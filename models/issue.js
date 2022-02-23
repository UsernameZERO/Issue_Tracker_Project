const mongoose = require('mongoose');

const issueSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
    },
    descriptionForI: {
        type: String
    },
    authorForI:{
        type: String
    },
    label:[
        {
            type: String
        }
    ],
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project'
    }

},{timestamps: true});

const Issue = mongoose.model('Issue', issueSchema);

module.exports = Issue;