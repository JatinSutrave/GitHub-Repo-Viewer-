const apiUrl = 'https://api.github.com/users/';

async function fetchRepositories(username, page = 1, perPage = 10) {
    const response = await fetch(`${apiUrl}${username}/repos?per_page=${perPage}&page=${page}`);
    return await response.json();
}

async function fetchAndDisplay(page, username = 'johnpapa') {
    document.getElementById('repositories').innerHTML = '<div class="text-center">Loading...</div>';
    const perPage = 10;
    const repositories = await fetchRepositories(username, page, perPage);
    updateRepositories(repositories, page, perPage);
}

function updateRepositories(repositories, page, perPage) {
    const repositoriesDiv = document.getElementById('repositories');
    repositoriesDiv.innerHTML = '';

    repositories.forEach(repo => {
        const repoDiv = document.createElement('div');
        repoDiv.innerHTML = `
            <div class="card mb-3">
                <div class="card-body">
                    <h5 class="card-title">${repo.name}</h5>
                    <p class="card-text">${repo.description}</p>
                    <p class="card-text"><strong>Topics:</strong> ${repo.topics.join(', ')}</p>
                </div>
            </div>
        `;
        repositoriesDiv.appendChild(repoDiv);
    });

    const pagination = document.createElement('div');
    pagination.innerHTML = `
        <nav aria-label="Page navigation">
            <ul class="pagination">
                <li class="page-item"><a class="page-link" href="#" onclick="fetchAndDisplay(${page - 1})">Previous</a></li>
                <li class="page-item"><a class="page-link" href="#" onclick="fetchAndDisplay(${page + 1})">Next</a></li>
            </ul>
        </nav>
    `;
    repositoriesDiv.appendChild(pagination);
}

function searchRepositories() {
    const username = document.getElementById('usernameInput').value;
    if (!username) {
        alert('Please enter a GitHub username.');
        return;
    }
    fetchAndDisplay(1, username);
}

fetchAndDisplay(1);
