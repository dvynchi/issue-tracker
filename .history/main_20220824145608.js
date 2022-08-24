document.getElementById('issueInputForm').addEventListener('submit', saveIssue);

function saveIssue(e) {
  var issueDesc = document.getElementById('issueDescInput').value;
  var issueSeverity = document.getElementById('issueSeverityInput').value;
  var issueProjectName = document.getElementById('issueProjectNameInput').value;
  var issueId = chance.guid();
  var issueStatus = 'Open';

    // create issue object
  var issue = {
    id: issueId,
    description: issueDesc,
    severity: issueSeverity,
    // assignedTo: issueAssignedTo,
    projectName: issueProjectName,
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
  } else {
    var issues = JSON.parse(localStorage.getItem('issues'));
    issues.push(issue);
    localStorage.setItem('issues', JSON.stringify(issues));
  }

  document.getElementById('issueInputForm').reset();

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
  localStorage.setItem('issues', JSON.stringify(issues));
  fetchIssues();
}

function deleteIssue(id) {
  var issues = JSON.parse(localStorage.getItem('issues'));

  for (var i = 0; i < issues.length; i++) {
    if (issues[i].id == id) {
      issues.splice(i, 1);
    }
  }
  localStorage.setItem('issues', JSON.stringify(issues));
  fetchIssues();
}

// implement tentative button
function setStatusTentative(id) {
  var issues = JSON.parse(localStorage.getItem('issues'));

  for (var i = 0; i < issues.length; i++) {
    if (issues[i].id == id) {
      issues[i].status = 'Tentative';
    }
  }
  localStorage.setItem('issues', JSON.stringify(issues));
  fetchIssues();
}

function fetchIssues() {
  var issues = JSON.parse(localStorage.getItem('issues'));
  var myList = document.getElementById('issuesList');

  issuesList.innerHTML = '';

  for (var i = 0; i < issues.length; i++) {
    var id = issues[i].id;
    var desc = issues[i].description;
    var severity = issues[i].severity;
    var projectName = issues[i].projectName;
    var status = issues[i].status;

    issuesList.innerHTML +=   '<div class="well">'+
                              '<h6>Issue ID: ' + id + '</h6>'+
                              '<p><span class="label label-info">' + status + '</span></p>'+
                              '<h3>' + desc + '</h3>'+
                              '<p><span class="glyphicon glyphicon-time"></span> ' + severity + '</p>'+
                              '<h3><span class="glyphicon glyphicon-user"></span> ' + projectName + '</h3>'+
                              // '<a href="#" onclick="setStatusClosed(\''+id+'\')" class="btn btn-warning">Close</a> '+
                              '<a href="#" onclick="setStatusClosed(\''+id+'\')" class="btn btn-success">Done</a> '+
                              '<a href="#" onclick="setStatusTentative(\''+id+'\')" class="btn btn-info">Tentative</a> '+
                              '<a href="#" onclick="deleteIssue(\''+id+'\')" class="btn btn-danger">Delete</a>'+
                              '</div>'; // close initial div
  }
}

