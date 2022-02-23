const Issue = require('../models/issue');
const Project = require('../models/project');

module.exports.create = async function(req, res){
    console.log(req.body.project);
    const project = await Project.findById(req.body.project);
    if (project) {

        // creating array for storing labels 
        let labelArr = [];
        let lablesList = function(str){
            let start = 0;
            let end;
            while(start != str.length){
                end = str.indexOf(" ", start + 1);
                labelArr.push(str.substring(start, end).trim());
                project.labels.push(str.substring(start, end));
                start = end+1;
            }
        };
        console.log("Arr===", labelArr);
        lablesList(req.body["labels_storage"]);
        const issue = await Issue.create({
        title: req.body.title,
        descriptionForI: req.body.descriptionForI,
        authorForI: req.body.authorForI,
        label: labelArr,
        project: project.id
    });
    console.log("prj iss", project.isssues);
    // project.labels.push(issue.label);
    project.issues.push(issue);
    project.save();
    return res.redirect('back');
   } else {
      console.log("Error in the in creation of issue");
      return res.redirect('/');
   }
}

