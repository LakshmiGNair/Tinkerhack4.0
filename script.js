const songs = [
    "songs/song1.mp3",
    "songs/song2.mp3",
    "songs/song3.mp3",
    "songs/song4.mp3",
    "songs/song5.mp3"
];

// Store custom songs
let customSongs = [];

// Handle Login
function handleLogin(event) {
    event.preventDefault();
    
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    
    // Basic validation (email must have @ and password must be at least 6 characters)
    if (!email.includes("@")) {
        alert("Please enter a valid email address");
        return;
    }
    
    if (password.length < 6) {
        alert("Password must be at least 6 characters long");
        return;
    }
    
    // Get existing user data or create new
    let userData = JSON.parse(localStorage.getItem("bondifyUser")) || {};
    
    // Update user info
    userData.email = email;
    userData.lastLogin = new Date().toLocaleDateString();
    
    // Calculate streak
    if (!userData.accountCreated) {
        userData.accountCreated = new Date().toLocaleDateString();
        userData.streak = 1;
        userData.lastAccessDate = new Date().toDateString();
    } else {
        const today = new Date().toDateString();
        const lastAccess = userData.lastAccessDate;
        
        if (today !== lastAccess) {
            const today = new Date();
            const last = new Date(lastAccess);
            const diffTime = today - last;
            const diffDays = diffTime / (1000 * 60 * 60 * 24);
            
            if (diffDays === 1) {
                userData.streak = (userData.streak || 1) + 1;
            } else if (diffDays > 1) {
                userData.streak = 1;
            }
            userData.lastAccessDate = today.toDateString();
        }
    }
    
    // Store user data
    localStorage.setItem("bondifyUser", JSON.stringify(userData));
    
    // Hide login page and show main content
    document.getElementById("loginPage").classList.add("hidden");
    document.getElementById("mainContent").classList.add("show");
    
    // Update header with streak
    updateStreak();
    
    alert("Welcome to Bondify! \u2764\ufe0f");
}

// Update streak display
function updateStreak() {
    const userData = JSON.parse(localStorage.getItem("bondifyUser"));
    if (userData) {
        document.getElementById("streakCount").textContent = userData.streak || 0;
    }
}

// Show profile modal
function showProfile() {
    const userData = JSON.parse(localStorage.getItem("bondifyUser"));
    if (userData) {
        document.getElementById("profileEmail").textContent = userData.email;
        document.getElementById("profileStreak").textContent = userData.streak || 0;
        document.getElementById("accountCreated").textContent = userData.accountCreated || "Not set";
        document.getElementById("lastLogin").textContent = userData.lastLogin || "Not set";
    }
    document.getElementById("profileModal").classList.add("show");
}

// Close profile modal
function closeProfile() {
    document.getElementById("profileModal").classList.remove("show");
}

// Logout function
function logout() {
    localStorage.removeItem("bondifyUser");
    document.getElementById("mainContent").classList.remove("show");
    document.getElementById("loginPage").classList.remove("hidden");
    document.getElementById("profileModal").classList.remove("show");
    document.getElementById("email").value = "";
    document.getElementById("password").value = "";
    alert("Logged out successfully!");
}

function showMusic() {
    document.getElementById("musicSection").style.display = "block";
}

function closeMusic() {
    document.getElementById("musicSection").style.display = "none";
}

function showGames() {
    document.getElementById("gamesSection").style.display = "block";
}

function closeGames() {
    document.getElementById("gamesSection").style.display = "none";
}

function answerGame(answer) {
    if (answer === 'me') {
        alert('Cute 😄');
    } else {
        alert('Aww 😍');
    }
}

function playSong(index) {
    const player = document.getElementById("player");
    player.src = songs[index];
    player.play();
}

function downloadCurrentSong() {
    const player = document.getElementById("player");
    const songSrc = player.src;
    
    if (!songSrc) {
        alert("Please play a song first!");
        return;
    }
    
    // Create a temporary link element
    const link = document.createElement("a");
    link.href = songSrc;
    
    // Determine the song name
    let songName = "song";
    
    // Check if it's a custom song
    const customSong = customSongs.find(s => s.url === songSrc);
    if (customSong) {
        songName = customSong.name;
    } else {
        // Use index-based naming for default songs
        const songIndex = songs.indexOf(songSrc);
        const songTitles = ["Perfect", "Until-I-Found-You", "All-of-Me", "Love-Me-Like-You-Do", "Tum-Hi-Ho"];
        if (songIndex !== -1 && songTitles[songIndex]) {
            songName = songTitles[songIndex];
        }
    }
    
    link.download = songName + ".mp3";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    alert("Download started: " + songName + ".mp3");
}

function addCustomSong() {
    const fileInput = document.getElementById("songFile");
    const file = fileInput.files[0];
    
    if (!file) {
        alert("Please select a song file");
        return;
    }
    
    // Create a blob URL for the selected file
    const songURL = URL.createObjectURL(file);
    const songName = file.name.replace(/\.[^/.]+$/, ""); // Remove file extension
    
    // Add to custom songs
    customSongs.push({ name: songName, url: songURL });
    
    // Create and add button for the new song
    const songListDiv = document.querySelector(".song-list");
    const newButton = document.createElement("button");
    newButton.textContent = "🎵 " + songName;
    newButton.onclick = function() {
        const player = document.getElementById("player");
        player.src = songURL;
        player.play();
    };
    songListDiv.appendChild(newButton);
    
    // Clear the file input
    fileInput.value = "";
    alert("Song added: " + songName);
}

// Create floating love emojis with varied animations
function createFloatingEmoji() {
    const emoji = document.createElement('div');
    emoji.classList.add('floating-emoji');
    
    // More red heart emojis and more frequent
    const emojis = ['❤️', '❤️', '❤️', '💕', '💖', '💗', '💝'];
    emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    
    // Random animation type
    const animations = ['', 'sway-left', 'sway-right', 'diagonal', 'spin'];
    const randomAnimation = animations[Math.floor(Math.random() * animations.length)];
    if (randomAnimation) {
        emoji.classList.add(randomAnimation);
    }
    
    emoji.style.left = Math.random() * 100 + '%';
    const duration = Math.random() * 4 + 6;
    emoji.style.animationDuration = duration + 's';
    
    // Vary emoji size
    emoji.style.fontSize = (Math.random() * 30 + 30) + 'px';
    
    document.body.appendChild(emoji);
    
    setTimeout(() => {
        emoji.remove();
    }, duration * 1000);
}

// Start creating emojis on page load
window.addEventListener('load', () => {
    // Check if user is already logged in
    const user = localStorage.getItem("bondifyUser");
    if (user) {
        document.getElementById("loginPage").classList.add("hidden");
        document.getElementById("mainContent").classList.add("show");
        updateStreak();
    }
    
    // Create initial batch of hearts
    for (let i = 0; i < 5; i++) {
        setTimeout(() => createFloatingEmoji(), i * 200);
    }
    // Then continue creating hearts regularly
    setInterval(createFloatingEmoji, 600);
});
