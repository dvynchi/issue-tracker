// function to fetch available issuesList
// store it in the browser
function fetchIssues() {
    var issues = JSON.parse(localStorage.getItem('issues')); // retrieve items from browser storage named issues and store in variable called issues
    // retrieve issuesList from index.html
    var List = document.getElementById('issuesList');

    // ensure original list is empty
    issuesList.innerHTML = '';

    // iterate issue items in issues object and add to innerHTML
    for (var i = 0; i < issues.Length; i++) {
        var id = issues[i].id;
        var desc = issues[i].description;
        var severity = issues[i].severity;
        var assigned = issues[i].assignedTo;
        var status = issues[i].status;
// generate html output and add to issuesList.innerHtml

    }





}