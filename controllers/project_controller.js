const Project = require('../models/project');
const Issue = require('../models/issue');

module.exports.mainPage =async function(req, res){
    const projects = await Project.find({})

    return res.render('main',{
        title: "Home",
        projectsList : projects,
    });

    // Project.find({}, function(err, projects){
    //     if (err) {
    //         console.log("Error in finding the project details in mainPage--",err);
    //         return;
    //     }
    //     console.log("okk");
    //     return res.render('main',{
    //         projectsList : projects,
    //     });
    // })
}

module.exports.create = function(req, res){
    Project.create(req.body, function(err, project){
        if (err) {
            console.log("Error in creating project in projController ", err);
            return;
        }
    });
    return res.redirect('back');
}

module.exports.projectPage = async function(req, res){
    const project = await Project.findById(req.params.id)
    // console.log("proz ", project);
    const issues = await Issue.find({project: project.id})

    let unqAuthors =[], unqLabels = [];
    for(let names of issues){
        if (!unqAuthors.includes(names.authorForI)) {
            unqAuthors.push(names.authorForI);
        }
        for(let tags of names.label){
            if (!unqLabels.includes(tags)) {
                unqLabels.push(tags);
            }
        }
    }
    // if (req.xhr) {
    //     console.log("enterdddddd ");
        // return res.status(200).json({
        //     data: {
        //         lables : unqLabels,
        //     },
        //     message: "lables addded"
        // });
    // }

    return res.render('ProjectPage',{
        title: "Project",
        project: project,
        issuesList: issues,
        unqAuthors: unqAuthors,
        unqLabels: unqLabels
    });
}

//for searching the titles and description through headers
module.exports.search = async function(req, res){
    console.log("Text ",req.body);
    console.log("Text ",req.body.searchText);
    const searchText = decodeURIComponent(req.body.searchText);
    // console.log(searchText);
    // For content type that are required as application/x-www-from-urlencoded
    // title and description
    const resultData = await Issue.find({
        $or: [
            {// $regex is to search the text in pattern to match the 
                title: { $regex: searchText, $options: "i"},
            },
            {// $option of 'i' is for case sensitivity   
                descriptionForI: {$regex: searchText, $options: "i"},
            }
        ],
    });
        // console.log("data: ", resultData);
        return res.json(resultData);
}

module.exports.filter = async function(req, res){
    // As thse are the headers we have mentioned while sending xhrrequest
    let checkedBox = {
        labels: {},
        authors: {},
    };
    console.log("laa labels", req.body.labels);
    console.log("laa authors", req.body.authors);
    console.log("laa ", req.body);

    if (req.body.labels.length == 0 && req.body.authors.length == 0) {
        checkedBox["labels"]["$exists"] = false;
        checkedBox["authors"]["$exists"] = false;
    } else {
        if (req.body.labels.length == 0) {// exists check whether it is null here
            checkedBox["labels"]["$exists"] = true;
        } else {
            checkedBox["labels"]["$in"] = req.body.labels;
        }
        if (req.body.authors.length == 0) { // $in checks value in array is equal
            checkedBox["authors"]["$exists"] = true;
        } else {
            checkedBox["authors"]["$in"] = req.body.authors;
        }
    }
    console.log("chheee lbl ", checkedBox["labels"]);
    console.log("chheee Ath ", checkedBox["authors"]);

    // if(checkedBox["authors"] != )
    const resultData = await Issue.find({
        authorForI: checkedBox["authors"],
        label: checkedBox["labels"],
    });
    console.log("dataa: ", resultData);
    return res.json(resultData);

}