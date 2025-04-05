// Video Editor State
const editorState = {
    currentProject: null,
    timelineItems: [],
    currentTime: 0,
    isPlaying: false,
    videoElement: null
};

// DOM Elements
const elements = {
    timeline: document.getElementById('timeline'),
    previewVideo: document.getElementById('previewVideo'),
    playBtn: document.getElementById('playBtn'),
    exportBtn: document.getElementById('exportBtn'),
    addClipBtn: document.getElementById('addClip')
};

// Initialize the editor
function initEditor() {
    // Load project data
    loadProject();
    
    // Set up video element
    if (elements.previewVideo) {
        editorState.videoElement = elements.previewVideo;
        setupVideoListeners();
    }

    // Event listeners
    if (elements.playBtn) {
        elements.playBtn.addEventListener('click', togglePlay);
    }

    if (elements.exportBtn) {
        elements.exportBtn.addEventListener('click', exportProject);
    }

    if (elements.addClipBtn) {
        elements.addClipBtn.addEventListener('click', addClipToTimeline);
    }

    // Load mock timeline items
    loadMockTimeline();
}

// Load project data
function loadProject() {
    // In a real app, this would come from your data store
    editorState.currentProject = {
        id: 1,
        title: 'My Video Project',
        duration: '2:45',
        resolution: '1080p'
    };
}

// Set up video event listeners
function setupVideoListeners() {
    editorState.videoElement.addEventListener('timeupdate', () => {
        editorState.currentTime = editorState.videoElement.currentTime;
        updateTimelineIndicator();
    });

    editorState.videoElement.addEventListener('play', () => {
        editorState.isPlaying = true;
        updatePlayButton();
    });

    editorState.videoElement.addEventListener('pause', () => {
        editorState.isPlaying = false;
        updatePlayButton();
    });
}

// Toggle play/pause
function togglePlay() {
    if (editorState.isPlaying) {
        editorState.videoElement.pause();
    } else {
        editorState.videoElement.play();
    }
}

// Update play button UI
function updatePlayButton() {
    if (elements.playBtn) {
        elements.playBtn.innerHTML = editorState.isPlaying ? 
            '<i class="fas fa-pause"></i> Pause' : 
            '<i class="fas fa-play"></i> Play';
    }
}

// Update timeline indicator
function updateTimelineIndicator() {
    // This would visually indicate the current play position in the timeline
    // Implementation would depend on your timeline UI structure
}

// Add clip to timeline
function addClipToTimeline() {
    const newClip = {
        id: Date.now(),
        name: `Clip ${editorState.timelineItems.length + 1}`,
        duration: 5,
        startTime: 0,
        endTime: 5,
        source: 'https://example.com/video-clip.mp4'
    };

    editorState.timelineItems.push(newClip);
    renderTimeline();
}

// Render timeline
function renderTimeline() {
    if (!elements.timeline) return;

    elements.timeline.innerHTML = editorState.timelineItems.map(item => `
        <div class="bg-gray-700 p-2 rounded cursor-move" data-id="${item.id}">
            <div class="flex justify-between items-center">
                <span>${item.name}</span>
                <div class="flex gap-2">
                    <button class="text-blue-400" onclick="editClip(${item.id})">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="text-red-400" onclick="removeClip(${item.id})">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// Edit clip
function editClip(clipId) {
    const clip = editorState.timelineItems.find(item => item.id === clipId);
    if (clip) {
        // In a real app, this would open a clip editor modal
        console.log('Editing clip:', clip);
    }
}

// Remove clip
function removeClip(clipId) {
    editorState.timelineItems = editorState.timelineItems.filter(item => item.id !== clipId);
    renderTimeline();
}

// Export project
function exportProject() {
    // In a real app, this would process the timeline and export the final video
    console.log('Exporting project:', editorState.currentProject);
    alert('Video exported successfully!');
}

// Load mock timeline items
function loadMockTimeline() {
    editorState.timelineItems = [
        {
            id: 1,
            name: 'Intro Clip',
            duration: 10,
            startTime: 0,
            endTime: 10,
            source: 'https://example.com/intro.mp4'
        },
        {
            id: 2,
            name: 'Main Content',
            duration: 30,
            startTime: 10,
            endTime: 40,
            source: 'https://example.com/main.mp4'
        },
        {
            id: 3,
            name: 'Outro',
            duration: 5,
            startTime: 40,
            endTime: 45,
            source: 'https://example.com/outro.mp4'
        }
    ];

    renderTimeline();
}

// Make functions available globally
window.editClip = editClip;
window.removeClip = removeClip;

// Initialize editor when DOM is loaded
document.addEventListener('DOMContentLoaded', initEditor);