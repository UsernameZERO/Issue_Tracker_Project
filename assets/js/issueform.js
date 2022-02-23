
console.log("entered to issueForm");

let showLabel = document.querySelector('#LabelsAdded');
let labels_Stored = document.querySelector('#label-storage');
let label = document.querySelector('#L');
let labelBtn = document.querySelector('#btn-label');

//to show tags that are added
let labelPresent = true;
let labelsArr =[];
labelBtn.addEventListener('click', (e)=>{
    e.preventDefault();
    if(label.value != ""){
        if (labelPresent) {
            labelPresent = false;
            showLabel.innerHTML += `<label>Lables : </label>`;
        }
        labels_Stored.value += label.value + " ";
        showLabel.innerHTML += `<div class = "tags">${label.value} </div>`;
        labelsArr.push(label.value);
        label.value = "";
    }
});
console.log("Lvaa ", labelsArr);

// For autoComplete for tags
// let autoLabels = [];

// label.onkeyup = (e)=>{
//     e.preventDefault();
//     console.log("bcsbcbcb    .");
//     $.ajax({
//         type: 'post',
//         url: '/project/:id/tags',
//          data: autoLabels,
//         success: function(data){
//             console.log(data);
//         }, error: function(error){
//             console.log(error.responseText);
//         }
//     });
// }






// for displaying issues
const input = document.querySelector('#dsc-title');
const searchBtn = document.querySelector('#btn-srch');

searchBtn.addEventListener('click', displayingThroughSearch);

function displayingThroughSearch(e){
    e.preventDefault();
    const searchForm = document.querySelector('#search-form');
    searchForm.reportValidity();//To check input is valid as true or false

    if (input.value != "") {
        let xhrReq = new XMLHttpRequest();
        xhrReq.open("POST", "/project/search-title&desc");
        xhrReq.setRequestHeader(
            "Content-type",
            "application/x-www-form-urlencoded"
        ); // as data can't be as json for headers
        const body = "searchText=" + encodeURIComponent(input.value);
        xhrReq.send(body);
        console.log("check ", xhrReq.response);
       xhrReq.onload =  function () {
           displayUserActionIssues(xhrReq.response);
       }
    }
}

// to display issues that are searched or filtered
function displayUserActionIssues(valueX){
    let bugBox = document.querySelector('.displayIssues');
    let data = JSON.parse(valueX);
    console.log("data :", data);
    let newIssueList = [];
    if (data.length == 0) {
        bugBox.innerHTML = `<h3 class="empty">No Result Found</h3>`;
        return;
    }
    for(let main of data){
        let queriedLables = [];
        for(let QueryL of main.label){
            let Ltag = ` <span id="L-tag">${QueryL}</span>`;
            queriedLables.push(Ltag);
        }
        let queriedIssue = `
        <div class="issue-box">
            <div class="firstBox">
                <h3 id="box-T">${main.title}</h3>
                <span id="box-A">${main.authorForI}</span>
            </div>
            <div class="middleBox">
                <p id="box-D">Description :${main.descriptionForI}</p>
            </div>
            <div class="finalBox">
                <span id="Mtag">Tags :</span>
                ${queriedLables.join(" ")}
            </div>
        </div>`;
        newIssueList.push(queriedIssue);
    }
    
    bugBox.innerHTML = newIssueList.join(" ");
}  

// for displaying through filter
const divLabel = document.querySelector('.label-f');
const divAuthor = document.querySelector('.label-a');
const BtnFilter = document.querySelector('#btn-filter');

let selectedLabels = [];
divLabel.addEventListener("click", (e)=>{
    if(e.target.className != "f-labelName"){ // to prevent clicking twice
        // console.log("clicked");
        selectedLabels = document.querySelectorAll(
            ".label-f input[type=checkbox]:checked");
    }
});

let selectedAuthors = [];
divAuthor.addEventListener("click", (e)=>{
    if(e.target.className != "a-labelName"){
        selectedAuthors = document.querySelectorAll(
            ".label-a input[type=checkbox]:checked");
    }
});
//Click event on filter event
BtnFilter.addEventListener("click", (e)=>{
    e.preventDefault();
    const authorObj = [];
    const labelObj = [];
    for(let author of selectedAuthors ){
        authorObj.push(author.value);
    }
    console.log("auth ", authorObj);
    for(let labels of selectedLabels ){
        labelObj.push(labels.value);
    }
    console.log("labe ", labelObj);
    // console.log("aaaa  ",authorObj," sdcs ", labelObj);
    let xhrReq = new XMLHttpRequest();
    xhrReq.open('POST', '/project/filterOut');
    xhrReq.setRequestHeader("Content-type", "application/json");
    xhrReq.send(
        JSON.stringify({
            labels : labelObj,
            authors : authorObj,
        })
    );
    xhrReq.onload = function () {
        displayUserActionIssues(xhrReq.response);
    }
})




