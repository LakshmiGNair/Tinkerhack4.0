function analyzeMood(text) {
    const lowerText = text.toLowerCase();
    
    const moods = {
        happy: {
            keywords: ['happy', 'great', 'amazing', 'wonderful', 'excellent', 'fantastic', 'love', 'blessed', 'grateful', 'excited', 'thrilled', 'joyful', 'perfect', 'awesome'],
            emoji: '😊',
            color: '#FFD700'
        },
        sad: {
            keywords: ['sad', 'unhappy', 'depressed', 'blue', 'down', 'lonely', 'miserable', 'terrible', 'awful', 'broken', 'crying', 'hurt', 'pain', 'hopeless'],
            emoji: '😢',
            color: '#4169E1'
        },
        stressed: {
            keywords: ['stressed', 'anxious', 'worried', 'nervous', 'overwhelmed', 'busy', 'hectic', 'frantic', 'pressured', 'tense', 'nervous'],
            emoji: '😰',
            color: '#FF6347'
        },
        angry: {
            keywords: ['angry', 'mad', 'furious', 'irritated', 'annoyed', 'frustrated', 'rage', 'hate', 'upset'],
            emoji: '😠',
            color: '#DC143C'
        },
        calm: {
            keywords: ['calm', 'peaceful', 'relaxed', 'serene', 'content', 'quiet', 'meditative', 'chilled', 'mellow', 'cool'],
            emoji: '😌',
            color: '#98FB98'
        },
        tired: {
            keywords: ['tired', 'exhausted', 'drained', 'sleepy', 'fatigued', 'weary', 'worn out', 'beat'],
            emoji: '😴',
            color: '#778899'
        },
        excited: {
            keywords: ['excited', 'pumped', 'hyped', 'can\'t wait', 'looking forward', 'stoked', 'thrilled', 'over the moon'],
            emoji: '🤩',
            color: '#FF69B4'
        }
    };
    
    let detectedMood = null;
    let maxMatches = 0;
    
    for (let mood in moods) {
        const matches = moods[mood].keywords.filter(keyword => lowerText.includes(keyword)).length;
        if (matches > maxMatches) {
            maxMatches = matches;
            detectedMood = mood;
        }
    }
    
    if (detectedMood) {
        return moods[detectedMood];
    }
    
    return {
        emoji: '🤔',
        color: '#9370DB',
        mood: 'thoughtful'
    };
}

// DISPLAY MOOD ANALYZER
function displayMood(text) {
    const moodDisplay = document.getElementById('moodDisplay');
    if (!text.trim()) {
        moodDisplay.innerHTML = '';
        return;
    }
    
    const mood = analyzeMood(text);
    moodDisplay.innerHTML = `<span style="font-size: 24px; margin-left: 10px;">${mood.emoji}</span>`;
}

// LOGIN FUNCTION
function login(event) {
    event.preventDefault();

    const email = document.getElementById("email").value;

    localStorage.setItem("email", email);

    window.location.href = "dashboard.html";
}

// NAVIGATION
function go(page) {
    window.location.href = page;
}

// INITIALIZE DASHBOARD
function initializeDashboard() {
    const userData = JSON.parse(localStorage.getItem("userData")) || {};
    const email = localStorage.getItem("email");
    
    if (!email) {
        window.location.href = "index.html";
        return;
    }

    document.getElementById("profileName").textContent = userData.name || "User";
    document.getElementById("profileEmail").textContent = email;

    const today = new Date().toDateString();
    let userData2 = JSON.parse(localStorage.getItem("userData")) || {};

    if (!userData2.firstLogin) {
        userData2.firstLogin = today;
        userData2.lastLogin = today;
        userData2.streak = 1;
    } else {
        const lastLogin = new Date(userData2.lastLogin);
        const currentDate = new Date();
        const diffTime = currentDate - lastLogin;
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays === 1) {
            userData2.streak = (userData2.streak || 0) + 1;
        } else if (diffDays > 1) {
            userData2.streak = 1;
        }

        userData2.lastLogin = today;
    }

    localStorage.setItem("userData", JSON.stringify(userData2));
    document.getElementById("streakCount").textContent = userData2.streak;
    document.getElementById("profileStreak").textContent = userData2.streak;
}

// PROFILE MODAL
function showProfile() {
    document.getElementById("profileModal").style.display = "block";
}

function closeProfile() {
    document.getElementById("profileModal").style.display = "none";
}

// LOGOUT FUNCTION
function logout() {
    localStorage.removeItem("email");
    localStorage.removeItem("userData");
    window.location.href = "index.html";
}

// SAVE ANSWER WITH MOOD ANALYSIS
function saveAnswer() {
    const answerBox = document.getElementById("answerBox");
    const answer = answerBox.value;
    
    if (!answer.trim()) {
        alert("Please write something!");
        return;
    }

    const today = new Date().toDateString();
    let userData = JSON.parse(localStorage.getItem("userData")) || {};

    if (!userData.dailyAnswers) {
        userData.dailyAnswers = {};
    }

    const mood = analyzeMood(answer);
    userData.dailyAnswers[today] = {
        text: answer,
        mood: mood.emoji,
        timestamp: new Date().toLocaleTimeString()
    };

    localStorage.setItem("userData", JSON.stringify(userData));
    answerBox.value = "";
    document.getElementById("moodDisplay").innerHTML = "";
    alert("Answer saved! Mood: " + mood.emoji);
}

// LOAD TODAY'S ANSWER
function loadTodayAnswer() {
    const today = new Date().toDateString();
    const userData = JSON.parse(localStorage.getItem("userData")) || {};

    if (userData.dailyAnswers && userData.dailyAnswers[today]) {
        const todayAnswer = userData.dailyAnswers[today];
        document.getElementById("answerBox").value = todayAnswer.text;
        displayMood(todayAnswer.text);
    }

    // Add real-time mood display on input
    const answerBox = document.getElementById("answerBox");
    answerBox.addEventListener("input", function() {
        displayMood(this.value);
    });
}