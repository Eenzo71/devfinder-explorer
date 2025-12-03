const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');
const profileContainer = document.getElementById('profile-container');
const errorMsg = document.getElementById('error-msg');
const loader = document.getElementById('loader');
const reposList = document.getElementById('repos-list');
const historySection = document.getElementById('history-section');
const historyList = document.getElementById('history-list');

const els = {
    avatar: document.getElementById('avatar'),
    name: document.getElementById('name'),
    username: document.getElementById('username'),
    joined: document.getElementById('joined'),
    bio: document.getElementById('bio'),
    repos: document.getElementById('repos-count'),
    followers: document.getElementById('followers'),
    following: document.getElementById('following'),
    location: document.getElementById('location'),
    company: document.getElementById('company'),
    blog: document.getElementById('blog'),
    locationBox: document.getElementById('location-box'),
    companyBox: document.getElementById('company-box'),
    blogBox: document.getElementById('blog-box')
};

const API_URL = 'https://api.github.com/users/';

window.addEventListener('load', () => {
    renderHistory();
});


async function handleSearch() {
    const user = searchInput.value.trim();
    if (!user) return;
    await fetchUserData(user);
}

async function fetchUserData(username) {
    setLoading(true);
    resetUI();

    try {
        const profileRes = await fetch(API_URL + username);
        if (!profileRes.ok) throw new Error('Usuário não encontrado');
        const profileData = await profileRes.json();

        const reposRes = await fetch(API_URL + username + '/repos?sort=updated&per_page=5');
        const reposData = await reposRes.json();

        updateUI(profileData, reposData);
        saveToHistory(profileData.login);

    } catch (error) {
        showError('Usuário não encontrado ou erro na API.');
    } finally {
        setLoading(false);
    }
}

function updateUI(user, repos) {
    els.avatar.src = user.avatar_url;
    els.name.innerText = user.name || user.login;
    els.username.innerText = `@${user.login}`;
    els.username.href = user.html_url;
            
    const date = new Date(user.created_at);
    els.joined.innerText = `Desde ${date.getFullYear()}`;
    els.bio.innerText = user.bio || 'Sem biografia definida.';
            
    els.repos.innerText = user.public_repos;
    els.followers.innerText = user.followers;
    els.following.innerText = user.following;

    updateOptionalField(els.locationBox, els.location, user.location);
    updateOptionalField(els.companyBox, els.company, user.company);
            
    if (user.blog) {
        els.blogBox.classList.remove('hidden');
        let blogUrl = user.blog.startsWith('http') ? user.blog : `https://${user.blog}`;
        els.blog.href = blogUrl;
        els.blog.innerText = user.blog;
    } else {
        els.blogBox.classList.add('hidden');
    }

    renderRepos(repos);
            
    profileContainer.classList.remove('hidden');
}

function updateOptionalField(boxElement, textElement, value) {
    if (value) {
        boxElement.classList.remove('hidden');
        textElement.innerText = value;
    } else {
        boxElement.classList.add('hidden');
    }
}

function renderRepos(repos) {
    reposList.innerHTML = '';
    if (repos.length === 0) {
        reposList.innerHTML = '<p class="text-slate-500 text-center py-4">Nenhum repositório público.</p>';
        return;
    }

    repos.forEach(repo => {
        const div = document.createElement('div');
        div.className = "bg-slate-950 p-4 rounded-lg border border-slate-800 hover:border-blue-500/50 hover:bg-slate-800 transition-all group cursor-pointer";
        div.onclick = () => window.open(repo.html_url, '_blank');

        div.innerHTML = `
            <div class="flex justify-between items-start mb-2">
                <h4 class="font-bold text-blue-400 group-hover:text-blue-300 truncate pr-4 text-lg">${repo.name}</h4>
                <div class="flex items-center gap-3 text-xs text-slate-400">
                    <span class="flex items-center gap-1 bg-slate-900 px-2 py-1 rounded border border-slate-700">
                        <i class="fas fa-star text-yellow-500"></i> ${repo.stargazers_count}
                    </span>
                </div>
            </div>
            <p class="text-sm text-slate-400 line-clamp-2 mb-3 h-10">${repo.description || "Sem descrição disponível para este projeto."}</p>
            <div class="flex gap-2 text-xs">
                ${repo.language ? `<span class="px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">${repo.language}</span>` : ''}
            </div>
        `;
        reposList.appendChild(div);
    });
}

function saveToHistory(username) {
    let history = JSON.parse(localStorage.getItem('github_finder_history')) || [];
            
    history = history.filter(u => u.toLowerCase() !== username.toLowerCase());
            
    history.unshift(username);

    if (history.length > 5) history.pop();

    localStorage.setItem('github_finder_history', JSON.stringify(history));
    renderHistory();
}

function renderHistory() {
    const history = JSON.parse(localStorage.getItem('github_finder_history')) || [];
            
    if (history.length > 0) {
        historySection.classList.remove('hidden');
        historyList.innerHTML = '';
                
        history.forEach(user => {
            const tag = document.createElement('button');
            tag.className = "bg-slate-800 hover:bg-blue-600 text-slate-300 hover:text-white text-xs py-1 px-3 rounded-full transition-colors border border-slate-700";
            tag.innerText = user;
            tag.onclick = () => {
                searchInput.value = user;
                handleSearch();
            };
            historyList.appendChild(tag);
        });
    } else {
        historySection.classList.add('hidden');
    }
}

function setLoading(isLoading) {
    if (isLoading) {
        loader.classList.remove('hidden');
        profileContainer.classList.add('hidden');
        searchBtn.disabled = true;
        searchBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
    } else {
        loader.classList.add('hidden');
        searchBtn.disabled = false;
        searchBtn.innerHTML = 'Buscar';
    }
}

function showError(msg) {
    errorMsg.classList.remove('hidden');
    document.getElementById('error-text').innerText = msg;
    setTimeout(() => errorMsg.classList.add('hidden'), 3000);
}

function resetUI() {
    errorMsg.classList.add('hidden');
    profileContainer.classList.add('hidden');
}

searchBtn.addEventListener('click', handleSearch);
        
searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleSearch();
});