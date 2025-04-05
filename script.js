// Main application state
const appState = {
    currentUser: null,
    projects: [],
    currentProject: null
};

// DOM Elements
const elements = {
    projectGrid: document.querySelector('.grid'),
    newProjectBtn: document.querySelector('button.bg-blue-500')
};

// Initialize the application
function init() {
    // Check for authenticated user
    checkAuthState();
    
    // Load projects if user is authenticated
    if (appState.currentUser) {
        loadProjects();
    }

    // Event listeners
    if (elements.newProjectBtn) {
        elements.newProjectBtn.addEventListener('click', createNewProject);
    }
}

// Check authentication state
function checkAuthState() {
    const user = localStorage.getItem('currentUser');
    if (user) {
        appState.currentUser = JSON.parse(user);
    } else {
        // Redirect to login if not authenticated
        if (!window.location.pathname.includes('login.html')) {
            window.location.href = 'login.html';
        }
    }
}

// Load user projects
function loadProjects() {
    // Mock projects - in a real app, these would come from an API
    const mockProjects = [
        {
            id: 1,
            title: 'Tech Review Video',
            thumbnail: 'https://images.pexels.com/photos/3568518/pexels-photo-3568518.jpeg',
            lastEdited: '2 days ago'
        },
        {
            id: 2,
            title: 'Travel Vlog',
            thumbnail: 'https://images.pexels.com/photos/699122/pexels-photo-699122.jpeg',
            lastEdited: '1 week ago'
        }
    ];

    appState.projects = mockProjects;
    renderProjects();
}

// Render projects to the UI
function renderProjects() {
    if (!elements.projectGrid) return;

    elements.projectGrid.innerHTML = appState.projects.map(project => `
        <div class="bg-gray-700 p-4 rounded-lg">
            <div class="aspect-w-16 aspect-h-9 mb-2">
                <img src="${project.thumbnail}" 
                     alt="${project.title}" 
                     class="w-full h-full object-cover rounded">
            </div>
            <h3 class="font-medium">${project.title}</h3>
            <p class="text-xs text-gray-300">Last edited: ${project.lastEdited}</p>
            <div class="flex justify-between mt-2">
                <button class="text-blue-400 text-sm" onclick="editProject(${project.id})">Edit</button>
                <button class="text-red-400 text-sm" onclick="deleteProject(${project.id})">Delete</button>
            </div>
        </div>
    `).join('');
}

// Create a new project
function createNewProject() {
    const newProject = {
        id: Date.now(),
        title: 'Untitled Project',
        thumbnail: 'https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg',
        lastEdited: 'Just now'
    };

    appState.projects.unshift(newProject);
    renderProjects();
    appState.currentProject = newProject;
    
    // Redirect to editor
    window.location.href = 'editor.html';
}

// Edit a project
function editProject(projectId) {
    const project = appState.projects.find(p => p.id === projectId);
    if (project) {
        appState.currentProject = project;
        window.location.href = 'editor.html';
    }
}

// Delete a project
function deleteProject(projectId) {
    if (confirm('Are you sure you want to delete this project?')) {
        appState.projects = appState.projects.filter(p => p.id !== projectId);
        renderProjects();
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', init);

// Make functions available globally
window.editProject = editProject;
window.deleteProject = deleteProject;