const issueContainerEl = document.querySelector("#issues-container");
const limitWarningEl = document.querySelector("#limit-warning");
const repoNameEl = document.querySelector("#repo-name");

const getRepoName = function () {
  let queryString = document.location.search;
  let repoName = queryString.split("=")[1];

  if (repoName) {
    // Append repoName to span (title) element
    repoNameEl.textContent = repoName;
    // Pass repoName to getRepoIssues function
    getRepoIssues(repoName);
  } else {
    // If no repo was given, redirect to the homepage
    document.location.replace("./index.html");
  }
};

const getRepoIssues = function (repo) {
  let apiUrl = `https://api.github.com/repos/${repo}/issues?direction=asc`;
  fetch(apiUrl).then(function (response) {
    // Request was successful
    if (response.ok) {
      response.json().then(function (data) {
        // Pass response data to DOM function
        displayIssues(data);

        // Check if API has paginated issues
        if (response.headers.get("Link")) {
          displayWarning(repo);
        }
      });
    } else {
      // If not successful, redirect to homepage
      document.location.replace("./index.html");
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

const displayWarning = function (repo) {
  // Add text to warning container
  limitWarningEl.textContent = `To see more than 30 issues, visit: `;

  const linkEl = document.createElement("a");
  linkEl.textContent = `See More Issues on GitHub.com`;
  linkEl.setAttribute(`href`, `https://github.com/${repo}/issues`);
  linkEl.setAttribute(`target`, `_blank`);

  // Append to warning container
  limitWarningEl.appendChild(linkEl);
};

getRepoName();
