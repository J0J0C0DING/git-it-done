// Search Form
const userFormEl = document.querySelector("#user-form");
// Username input in Search Form
const nameInputEl = document.querySelector("#username");
// Right column where repositories will display
const repoContainerEl = document.querySelector("#repos-container");
// Search title displayed after search
const repoSearchTerm = document.querySelector("#repo-search-term");
// Language Buttons
let languageButtonsEl = document.querySelector("div#language-buttons");

// Submit button
const formSubmitHandler = function (event) {
  event.preventDefault();
  // Get value from input element
  let username = nameInputEl.value.trim();

  // Make sure input is filled out
  if (username) {
    getUserRepos(username);
    // Reset input value to empty
    nameInputEl.value = "";
  } else {
    alert("Please enter a GitHub username");
  }
};

const getUserRepos = function (user) {
  // Format the GitHub API url
  let apiUrl = `https://api.github.com/users/${user}/repos`;
  // Make a request to the URL
  fetch(apiUrl)
    .then(function (response) {
      // Request was successful
      if (response.ok) {
        response.json().then(function (data) {
          displayRepos(data, user);
        });
        // Else display error
      } else {
        alert("Error: GitHub User Not Found");
      }
    })
    .catch(function (error) {
      alert("Unable to connect to GitHub");
    });
};

const getFeaturedRepos = function (language) {
  let apiUrl = `https://api.github.com/search/repositories?q=${language}+is:featured&sort=help-wanted-issues`;

  fetch(apiUrl).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        displayRepos(data.items, language);
      });
    } else {
      alert("Error: GitHub User Not Found");
    }
  });
};

// Submit listener for Search Form
userFormEl.addEventListener("submit", formSubmitHandler);

const displayRepos = function (repos, searchTerm) {
  if (repos.length === 0) {
    repoContainerEl.textContent = "No Repositories Found.";
    return;
  }
  // Clear old content
  repoContainerEl.textContent = "";
  repoSearchTerm.textContent = searchTerm;

  // Loop over repos
  for (let i = 0; i < repos.length; i++) {
    // Format repo name
    let repoName = `${repos[i].owner.login}/${repos[i].name}`;

    // Create a container for each repo
    let repoEl = document.createElement("a");
    repoEl.classList = "list-item flex-row justify-space-between align-center";
    repoEl.setAttribute("href", `./single-repo.html?repo=${repoName}`);

    // Create a span element to hold repository name
    let titleEl = document.createElement("span");
    titleEl.textContent = repoName;

    // Append to container
    repoEl.appendChild(titleEl);

    // Create a status element
    let statusEl = document.createElement("span");
    statusEl.classList = "flex-row align-center";

    // Check if current repo has issue or not
    if (repos[i].open_issues_count > 0) {
      statusEl.innerHTML = `<i class="fas fa-times status-icon icon-danger"></i> ${repos[i].open_issues_count} issue(s)`;
    } else {
      statusEl.innerHTML = `<i class="fas fa-check-square status-icon icon-success"></i>`;
    }

    // Append to container
    repoEl.appendChild(statusEl);

    // Append container to the DOM
    repoContainerEl.appendChild(repoEl);
  }
};

let buttonClickHandler = function (event) {
  let language = event.target.getAttribute("data-language");
  if (language) {
    getFeaturedRepos(language);
    repoContainerEl.textContent = "";
  }
};

languageButtonsEl.addEventListener("click", buttonClickHandler);
