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

// --------------------------
// Pairing / WebRTC DataChannel
// --------------------------
let pc = null;
let dc = null;
const rtcConfig = {iceServers:[{urls:'stun:stun.l.google.com:19302'}]};

function appendMessage(sender, text) {
    const div = document.getElementById('partnerMessages');
    if (!div) return;
    const p = document.createElement('div');
    p.textContent = sender + ': ' + text;
    div.appendChild(p);
    div.scrollTop = div.scrollHeight;
}

function setupDataChannel() {
    if (!dc) return;
    dc.onopen = () => appendMessage('System', 'Data channel open');
    dc.onclose = () => appendMessage('System', 'Data channel closed');
    dc.onmessage = (evt) => {
        try {
            const msg = JSON.parse(evt.data);
            handlePeerMessage(msg);
        } catch (e) {
            appendMessage('Partner', evt.data);
        }
    };
}

function handlePeerMessage(msg) {
    if (!msg || !msg.type) return;
    switch (msg.type) {
        case 'chat':
            appendMessage('Partner', msg.text);
            showBrowserNotification('New message from partner', msg.text);
            break;
        case 'answerSaved':
            appendMessage('Partner', `Saved: ${msg.text} ${msg.mood || ''}`);
            showBrowserNotification('Partner saved an answer', msg.text);
            break;
        case 'gameChoice':
            appendMessage('Partner', `Chose: ${msg.choice}`);
            alert('Partner chose: ' + msg.choice);
            break;
        default:
            appendMessage('Partner', JSON.stringify(msg));
    }
}

function showBrowserNotification(title, body) {
    if (!('Notification' in window)) return;
    try {
        if (Notification.permission === 'granted') {
            new Notification(title, { body });
        } else if (Notification.permission !== 'denied') {
            Notification.requestPermission().then(permission => {
                if (permission === 'granted') new Notification(title, { body });
            });
        }
    } catch (e) {
        console.warn('Notification error', e);
    }
}

async function createPeer(isCaller) {
    pc = new RTCPeerConnection(rtcConfig);
    pc.onicecandidate = (e) => {
        // ICE candidates will be included automatically in typical SDP exchange
    };
    pc.oniceconnectionstatechange = () => console.log('ICE', pc.iceConnectionState);

    if (isCaller) {
        dc = pc.createDataChannel('pair');
        setupDataChannel();
    } else {
        pc.ondatachannel = (e) => {
            dc = e.channel;
            setupDataChannel();
        };
    }

    return pc;
}

async function createOffer() {
    await createPeer(true);
    const offer = await pc.createOffer();
    await pc.setLocalDescription(offer);
    document.getElementById('localSDP').value = JSON.stringify(pc.localDescription);
}

async function createAnswerFromOffer() {
    const remote = document.getElementById('remoteSDP').value;
    if (!remote) return alert('Paste partner offer into the Remote SDP box first.');
    await createPeer(false);
    const offerDesc = new RTCSessionDescription(JSON.parse(remote));
    await pc.setRemoteDescription(offerDesc);
    const answer = await pc.createAnswer();
    await pc.setLocalDescription(answer);
    document.getElementById('localSDP').value = JSON.stringify(pc.localDescription);
}

async function setRemoteFromTextarea() {
    const remote = document.getElementById('remoteSDP').value;
    if (!remote) return alert('Paste partner SDP into the Remote SDP box.');
    if (!pc) return alert('No peer connection yet. Create offer or answer first.');
    const desc = new RTCSessionDescription(JSON.parse(remote));
    await pc.setRemoteDescription(desc);
    appendMessage('System', 'Remote SDP set');
}

function sendToPartner(obj) {
    if (!dc || dc.readyState !== 'open') {
        appendMessage('System', 'Not connected to partner');
        return;
    }
    dc.send(JSON.stringify(obj));
}

// Send message from main message box (replaced daily question)
function sendPartnerFromBox() {
    const box = document.getElementById('answerBox');
    if (!box) return;
    const text = box.value.trim();
    if (!text) return alert('Please write a message to send.');
    appendMessage('You', text);
    if (dc && dc.readyState === 'open') {
        sendToPartner({ type: 'chat', text });
    } else {
        appendMessage('System', 'Message queued locally (partner not connected)');
    }
    box.value = '';
}

// Wire up dashboard buttons if present
window.addEventListener('load', () => {
    const createOfferBtn = document.getElementById('createOfferBtn');
    const createAnswerBtn = document.getElementById('createAnswerBtn');
    const setRemoteBtn = document.getElementById('setRemoteBtn');
    const sendPartnerMsg = document.getElementById('sendPartnerMsg');

    if (createOfferBtn) createOfferBtn.onclick = createOffer;
    if (createAnswerBtn) createAnswerBtn.onclick = createAnswerFromOffer;
    if (setRemoteBtn) setRemoteBtn.onclick = setRemoteFromTextarea;
    if (sendPartnerMsg) sendPartnerMsg.onclick = () => {
        const input = document.getElementById('partnerInput');
        if (!input || !input.value.trim()) return;
        appendMessage('You', input.value);
        sendToPartner({type:'chat', text: input.value});
        input.value = '';
    };
});

// Send saved answer to partner when available
const _saveAnswer = saveAnswer;
saveAnswer = function() {
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

    if (dc && dc.readyState === 'open') {
        sendToPartner({type:'answerSaved', text: userData.dailyAnswers[today].text, mood: mood.emoji, timestamp: userData.dailyAnswers[today].timestamp});
    }
};

// Helper for game page to send choice
function sendGameChoice(choice) {
    if (dc && dc.readyState === 'open') {
        sendToPartner({type:'gameChoice', choice});
    }
}