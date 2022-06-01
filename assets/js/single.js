const issueContainerEl = document.querySelector("#issues-container");

const getRepoIssues = function (repo) {
  let apiUrl = `https://api.github.com/repos/${repo}/issues?direction=asc`;
  fetch(apiUrl).then(function (response) {
    // Request was successful
    if (response.ok) {
      response.json().then(function (data) {
        // Pass response data to DOM function
        displayIssues(data);
      });
    } else {
      alert(`There is a problem with your request!`);
    }
  });
};

const displayIssues = function (issues) {
  for (let i = 0; i < issues.length; i++) {
    // Create a link element to take users to the issue on GitHub
    const issueEl = document.createElement("a");
    issueEl.classList = "list-item flex-row justify-space-between align-center";
    issueEl.setAttribute("href", issues[i].html_url);
    issueEl.setAttribute("target", "_blank");

    // Create span to hold issue title
    const titleEl = document.createElement("span");
    titleEl.textContent = issues[i].title;

    // Append to container
    issueEl.append(titleEl);

    // Create a type element
    const typeEl = document.createElement("span");

    // Check if issue is an actual issue or a pull request
    if (issues[i].pull_request) {
      typeEl.textContent = "(Pull Request)";
    } else {
      typeEl.textContent = "(Issue)";
    }

    // Append to container
    issueEl.appendChild(typeEl);

    issueContainerEl.appendChild(issueEl);
  }
};

getRepoIssues("twitter/chill");
