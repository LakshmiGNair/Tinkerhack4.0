
<p align="center">
  <img src="./img.png" alt="Project Banner" width="100%">
</p>

# BONDIFY 🎯

## Basic Details

### Team Name:Mean Girls

### Team Members
- Member 1: Lakshmi G Nair -College of Engineering Attingal
- Member 2: Vaishnavi B- College of Engineering Attingal

### Hosted Project Link
https://lakshmignair.github.io/Tinkerhack4.0/

### Project Description
**Bondify** is a web application designed for couples in long-distance relationships to feel closer, stay connected, and nurture their bond — no matter how many miles apart they are. Built with pure HTML, CSS, and JavaScript, Bondify requires zero installation and works instantly in any browser.

### The Problem statement
Long-distance relationships are hard. The absence of physical presence, time zone differences, and the monotony of just texting or calling can make couples feel disconnected over time. There is no single platform that combines emotional check-ins, shared entertainment, meaningful conversation starters, and fun activities — all tailored specifically for couples.

Bondify solves this by bringing everything a couple needs into one warm, beautiful space.

### The Solution
Bondify solves the emotional disconnect in long-distance relationships by bringing everything couples need into one place — mood check-ins, shared music, fun games, and daily streaks. Instead of juggling multiple apps, couples get a single warm, personal space designed just for them. It turns the distance from a barrier into an opportunity to connect more intentionally, every single day.

---

## Technical Details

### Technologies/Components Used

**For Software:**
- Languages used: HTML,CSS,JavaScript
- Frameworks used: NIL
- Libraries used: NIL
- Tools used: VS Code,Github

**For Hardware:**
- Main components:NIL
- Specifications: NIL
- Tools required: NIL

---

## Features

List the key features of your project:
- ### 🔥 Daily Streak Tracker
Couples are encouraged to log in every day to keep their streak alive. Seeing that flame grow motivates both partners to show up for each other consistently, turning a small daily habit into a meaningful ritual.

### 😊 Mood Analyzer
Each partner can share how they're feeling — Happy, Loved up, Missing you, Stressed, or Excited. The app responds with a personalized message that encourages connection based on the mood selected. This creates emotional awareness between partners even when they can't be physically present.

### 💬 Question Cards
A curated set of deep, fun, and thought-provoking questions that couples can answer together. From "What was the exact moment you knew I was special?" to "Describe our future home in three words" — these cards spark meaningful conversations that go beyond the usual small talk.

### 🎵 Sync Music Player
Couples can paste any YouTube link or pick from a curated playlist of 8 romantic songs and listen together in real time. The embedded YouTube player means no extra apps are needed. Spotify links are also supported with a direct open option.

### 🎮 Play Together
A set of mini-games built for two — Would You Rather, Trivia for Two, Guess the Memory, and 20 Questions. These light-hearted games add fun and laughter to long-distance interactions.

### 📹 Video Call
A one-click video call button to instantly connect face-to-face, making it easy to jump from any activity straight into a live conversation.

### 📸 Profile & Couple Photo Upload
Each user can upload their own profile photo as an avatar, and together they can set a shared couple photo that becomes the beautiful hero background of the dashboard — making the space feel personal and theirs.

### 👤 Personalized Experience
Names entered at login carry through the entire app — greetings, mood messages, music notes, and streak counts all reference both partners by name, making every interaction feel intimate and personal.

---

## Implementation

### For Software:

#### Installation
```bash
[Installation commands - e.g., npm install, pip install -r requirements.txt]
```

#### Run
```bash
[Run commands - e.g., npm start, python app.py]
```



---

## Project Documentation

### For Software:

#### Screenshots (Add at least 3)

<img width="929" height="852" alt="Screenshot 2026-02-21 100551" src="https://github.com/user-attachments/assets/cd4d088e-cbf4-4d79-a65e-3602104d2449" />

A simple, beautiful login where couples enter their names, email, and password to step into their shared space on Bondify

<img width="1745" height="843" alt="Screenshot 2026-02-21 100635" src="https://github.com/user-attachments/assets/06456b8d-0b71-4f4e-be1a-f451fa1d1987" />

Bondify's personalized dashboard greets each couple by name, shows their avatars side by side with a 14-day streak, and lets them check in emotionally with a single tap. The mood analyzer and name fields make every session feel uniquely theirs — warm, intimate, and built for two. 💕

<img width="814" height="413" alt="image" src="https://github.com/user-attachments/assets/85fb8725-d5c8-4bb7-9012-3559df483983" />

Bondify's feature hub gives couples five ways to connect — video calls for face-to-face moments, question cards for deeper conversations, mini-games for fun across the miles, synced music to listen together, and a streak tracker to celebrate showing up for each other every day. Everything a couple needs, all in one place. 💕

#### Diagrams

**System Architecture:**


---

## 🏗️ Bondify — System Architecture

### Frontend Layer (Client-Side)
The entire application runs on the browser using plain **HTML5, CSS3, and JavaScript** — no frameworks, no backend, no server required. All logic, rendering, and interactivity happens client-side.

### Data Layer (localStorage)
Since Bondify is a frontend-only app, user data is persisted using the browser's **localStorage API**:
- Partner names → `userName`, `partnerName`
- Profile photo → `profilePhoto` (base64)
- Couple photo → `couplePhoto` (base64)
- Streak count → `streakCount`
- Mood selection → `currentMood`

### External Integrations
| Service | Purpose |
|---|---|
| **YouTube Embed API** | Plays songs inside the dashboard via iframe |
| **Google Fonts API** | Loads Playfair Display + DM Sans typography |
| **Spotify (redirect)** | Opens Spotify links in a new tab |

### Navigation Flow
```
index.html (Login)
     ↓  localStorage.setItem(names)
dashboard.html (Main App)
     ↓
[ Video | Questions | Games | Music | Streak ] → Modal Popups
```

### Architecture Diagram
```
┌─────────────────────────────────────┐
│           Browser (Client)          │
│                                     │
│  ┌──────────┐     ┌──────────────┐  │
│  │ index.html│────▶│dashboard.html│  │
│  │  Login   │     │   Dashboard  │  │
│  └──────────┘     └──────┬───────┘  │
│                          │          │
│              ┌───────────▼────────┐ │
│              │    localStorage    │ │
│              │  names, photos,    │ │
│              │  streak, mood      │ │
│              └────────────────────┘ │
│                                     │
│  External APIs                      │
│  ┌──────────┐  ┌──────────────────┐ │
│  │ YouTube  │  │  Google Fonts    │ │
│  │  Embed   │  │      CDN         │ │
│  └──────────┘  └──────────────────┘ │
└─────────────────────────────────────┘
```

---

**Key design decision:** By keeping the architecture entirely client-side, Bondify has zero hosting cost, zero backend complexity, and can be deployed in seconds on any static host like GitHub Pages or Netlify.

**Application Workflow:**


---

## 🔄 Bondify — Application Workflow

### Step 1 — Login (`index.html`)
```
User opens Bondify
        ↓
Enters: Your Name + Partner's Name + Email + Password
        ↓
Clicks "Let's go 💕"
        ↓
Names saved to localStorage
        ↓
Redirects to dashboard.html
```

### Step 2 — Dashboard Loads (`dashboard.html`)
```
Dashboard opens
        ↓
Reads names from localStorage
        ↓
Greets user → "Hello, Lachmi 🌸 & Vyshuu are connected 💕"
        ↓
Loads saved profile photo + couple photo (if any)
        ↓
Shows 14-day streak 🔥
```

### Step 3 — User Interactions
```
┌─────────────────────────────────────────────┐
│              DASHBOARD ACTIONS              │
├─────────────┬───────────────────────────────┤
│ Upload Photo│ Click avatar → file picker    │
│             │ → saved to localStorage       │
├─────────────┼───────────────────────────────┤
│ Couple Photo│ Click "Add couple photo"      │
│             │ → becomes hero background     │
├─────────────┼───────────────────────────────┤
│ Update Names│ Type in name fields           │
│             │ → hero updates live instantly │
├─────────────┼───────────────────────────────┤
│ Mood Check  │ Click a mood button           │
│             │ → personalized message shown  │
└─────────────┴───────────────────────────────┘
```

### Step 4 — Feature Cards (Modal Flow)
```
User clicks a feature card
        ↓
Modal opens with animation
        ↓
┌──────────────┬──────────────────────────────┐
│ 📹 Video Call │ Click → Start video call     │
├──────────────┼──────────────────────────────┤
│ 💬 Questions  │ Random question drawn        │
│              │ → Shuffle for next one       │
├──────────────┼──────────────────────────────┤
│ 🎮 Games      │ Pick a game → launches it   │
├──────────────┼──────────────────────────────┤
│ 🎵 Music      │ Paste YouTube link → plays  │
│              │ OR pick preset song          │
│              │ → embeds & plays instantly   │
├──────────────┼──────────────────────────────┤
│ 📅 Streak     │ Shows dot calendar of       │
│              │ daily check-in history       │
└──────────────┴──────────────────────────────┘
        ↓
User closes modal → back to dashboard
```

### Step 5 — Data Persistence
```
Any change (name, photo, mood)
        ↓
Saved to localStorage
        ↓
Available on next visit automatically
        ↓
No login needed again ✅
```

### Complete End-to-End Flow
```
Open App → Login → Dashboard → 
Pick a Feature → Interact → Close Modal → 
Pick Another Feature → Data Auto-Saved → 
Come Back Tomorrow → Streak +1 🔥
```

---

**Core principle:** Every interaction is instant, smooth, and requires no page reloads — making Bondify feel like a native app despite being built with pure HTML, CSS, and JavaScript.

---


#### Build Photos

![Team]
![photo_2026-02-21_10-21-32](https://github.com/user-attachments/assets/a97363eb-f78a-4475-9efc-159e8bfdb545)


![Final]<img width="1627" height="825" alt="Screenshot 2026-02-21 100702" src="https://github.com/user-attachments/assets/ee208668-a646-41bc-a6ff-6784fb195cb6" />

## 🚀 Bondify — Final Build

Bondify is a **two-page web app** built with pure HTML, CSS, and JavaScript — no frameworks, no backend needed.

**`index.html`** — Login page that collects both partner names, saves them to `localStorage`, and redirects to the dashboard.

**`dashboard.html`** — The main app with 5 features all in one place:
- 🖼️ **Hero banner** — personalized greeting, avatar upload, couple photo, and streak counter
- 😊 **Mood analyzer** — daily emotional check-in with personalized responses
- 🎵 **Music player** — paste any YouTube link or pick from 8 preset romantic songs
- 💬 **Question cards** — random deep questions to spark meaningful conversations
- 🎮 **Games & Streak** — mini-games and a visual check-in history

All data — names, photos, moods — is saved in `localStorage` so everything is restored automatically on the next visit. No login needed twice. Deploy it instantly on GitHub Pages or Netlify for free. 🚀

---



## AI Tools Used (Optional - For Transparency Bonus)

If you used AI tools during development, document them here for transparency:

**Tool Used:**  GitHub Copilot ChatGPT, Claude

**Purpose:** code generation and analysis



---

## Team Contributions

- Vaishnavi B:  Frontend development
- Lakshmi G Nair: Backend development


---


---

Made with ❤️ at TinkerHub
