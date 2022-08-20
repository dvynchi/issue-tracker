// handle submit event - send data to local (browser) storage each time user clicks the add button

document.getElementById('issueInputForm').addEventListener('submit', saveIssue);
// function that stores available issuesList
function saveIssue(e) {
    var issueDesc = document.getElementById('issueDescInput').value;
    var issueSeverity = document.getElementById('issueSeverityInput').value;
    var issueAssignedTo = document.getElementById('issueAssignedToInput').value; 
    var issueId = chance.guid(); // generate global unique issue id with chance JS
    var  issueStatus = 'Open';

    // create issue object
    var issue = {
        id: issueId,
        description: issueDesc,
        severity: issueSeverity,
        assignedTo: issueAssignedTo,
        status: issueStatus
    }
     /*
     insert object to local storage
    check if there are items in the local storage, if not, push issue object into the issues array defined in the if statement
    else retrieve items from local storage into the issues array and send it back to the local storage */
   
    if (localStorage.getItem('issues') == null) {
        var issues = [];
        issues.push(issue);
        localStorage.setItem('issues', JSON.stringify(issues));
    }
    else {
        var issue = JSON.parse(localStorage.getItem('issues'));
        issues.push(issue);
        localStorage.setItem('issues', JSON.stringify(issues));
    }
    //reset input elements - clear form
    document.getElementById('issueInputForm').reset();
    
    //regenerate list with new element
    fetchIssues();
    e.preventDefault();
}

// implement close and delete buttons

function setStatusClosed(id) {
    var issues = JSON.parse(localStorage.getItem('issues'));

    for (var i = 0; i < issues.length; i++) {
        if (issues[i].id == id) {
            issues[i].status = 'Closed';
        }
    }

    localStorage.setItem('issues', JSON.stringify())
}
// function fetches available issuesList
function fetchIssues() {
    // retrieve items from browser storage named issues and store in variable called issues
    var issues = JSON.parse(localStorage.getItem('issues')); 
    // retrieve issuesList from index.html
    var List = document.getElementById('issuesList');

    // ensure original list is empty
    issuesList.innerHTML = ' ';

    // iterate through issue items in issues object and add to innerHTML
    for (var i = 0; i < issues.length; i++) {
        var id = issues[i].id;
        var desc = issues[i].description;
        var severity = issues[i].severity;
        var assignedTo = issues[i].assignedTo;
        var status = issues[i].status;
        // generate html output and add to issuesList.innerHtml (bootstrap formatting and icons were used in paragraphs)
        issuesList.innerHTML += '<div class="well">' +
                                                '<h6>IssueID:  ' + id + '</h6>' + 
                                                '<p><span class="label label-info">' + status + '</span></p>' +
                                                '<h3>' + desc + '</h3>' +
                                                '<p><span class="glyphicon glyphicon-time">' + severity + '</p>' +
                                                '<p><span class="glyphicon glyphicon-user">' + assignedTo + '</p>' +
                                                // add buttons
                                                '<a href="#" onclick="setStatusClosed(\' '+id+' \')" class="btn btn-warning">Close</a>' +
                                                '<a href="#" onclick="deleteIssue(\' '+id+' \')" class="btn btn-danger">Delete</a>' +
                                                '</div>';   // close initial div

    }
}

