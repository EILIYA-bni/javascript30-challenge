# Day 01 — JavaScript Drum Kit 🥁

The first project of my [JavaScript30 Challenge](https://javascript30.com/) by Wes Bos.

An interactive drum kit built using **HTML, CSS, and Vanilla JavaScript**. Users can play different drum sounds by pressing the corresponding keys on their keyboard.

## 🎯 Project Overview

The goal of this project is to practice JavaScript fundamentals by building a keyboard-controlled drum kit with sound effects and visual animations.

## ✨ Features

- Play drum sounds using keyboard keys (A, S, D, F, G, H, J, K, L).
- Display visual feedback when a key is pressed.
- Play audio using the HTML5 Audio API.
- Remove animations automatically after CSS transitions finish.
- Handle keyboard events using Vanilla JavaScript.

## 🛠️ Technologies Used

- **HTML5** — Structure and audio elements.
- **CSS3** — Styling, transitions, and animations.
- **JavaScript** — Keyboard events, DOM manipulation, and audio playback.

## 📚 What I Learned

### 1. DOM Manipulation
Using `document.querySelector()` to select HTML elements dynamically.

### 2. Event Listeners
Using `addEventListener()` to respond to keyboard interactions and CSS transition events.

### 3. Keyboard Events
Understanding the `keydown` event and identifying pressed keys using their corresponding key codes.

### 4. HTML5 Audio API
Using `audio.play()` and resetting `audio.currentTime` to allow sounds to play repeatedly without delay.

### 5. CSS Transitions
Combining JavaScript and CSS to create interactive visual effects and using `transitionend` to remove animation classes.

## 🚀 How to Run

1. Clone the repository:

```bash
git clone https://github.com/EILIYA-bni/javascript30-challenge.git
```

2. Navigate to the project directory:

```bash
cd javascript30-challenge/01-drum-kit
```

3. Open `index.html` in your browser.

4. Press **A, S, D, F, G, H, J, K, or L** to play the corresponding drum sounds.

## 💡 Key Takeaway

This project demonstrates how JavaScript can connect user interactions with audio playback and visual feedback.

The most important concept I practiced was **event-driven programming** — responding to user actions through event listeners rather than executing everything sequentially.

## 🙏 Credits

Original challenge created by [Wes Bos](https://wesbos.com/) as part of [JavaScript30](https://javascript30.com/).

---

**Day 01/30 — Building stronger JavaScript fundamentals, one project at a time.**

[⬅ Back to JavaScript30 Challenge](../README.md)