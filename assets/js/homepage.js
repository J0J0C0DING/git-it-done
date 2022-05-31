const getUserRepos = function (user) {
  // Format the GitHub API url
  let apiUrl = `https://api.github.com/users/${user}/repos`;
  // Make a request to the URL
  fetch(apiUrl).then(function (response) {
    response.json().then(function (data) {
      console.log(data);
    });
  });
};

getUserRepos("J0J0C0DING");
