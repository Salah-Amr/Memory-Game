# Card Matching Game 🎴

A simple and interactive **Card Matching (Memory) Game** built using **TypeScript**, HTML, and CSS.
The game challenges players to match pairs of cards by flipping them with smooth 3D animations.

You can try it at: [Memory Game](https://salah-amr.github.io/Memory-Game/)

---

## 🚀 Features

* Built with **TypeScript** using OOP concepts
* Smooth **3D flip animation** on card click
* Matching logic with success and failure handling
* Sound effects for correct and incorrect matches
* Toast notifications using **Toastify.js**
* Responsive grid layout (5 cards per row)
* Clean and minimal UI with calm colors

---

## 🛠️ Technologies Used

* TypeScript
* JavaScript (ES Modules)
* HTML5
* CSS3 (3D Transforms & Animations)
* Toastify.js

---

## 🎮 How to Play

1. Click on a card to flip it.
2. Click on another card to try matching the pair.
3. If the cards match, they stay open.
4. If they don't match, they flip back after a short delay.
5. The number of attempts is tracked during gameplay.

---

## 📂 Project Structure
```
project-root/
│
├── frontend/
│   ├── style.css
│   └── style2.css
│
├── scripts/                 # Compiled JavaScript (OUTDIR)
│   ├── classes/
│   │   ├── card.model.js
│   │   └── game.model.js
│   │
│   ├── constants.js
│   ├── constants.js.map
│   ├── constants.d.ts
│   ├── constants.d.ts.map
│   │
│   ├── script.js
│   ├── script.js.map
│   ├── script.d.ts
│   └── script.d.ts.map
│
├── src/
│   ├── images/
│   │   ├── q.jpg
│   │   ├── cpp.png
│   │   ├── java.png
│   │   ├── cs.png
│   │   ├── js.png
│   │   └── ts.png
│   │
│   └── sounds/
│       ├── success.mp3
│       └── wrong.mp3
│
├── tscripts/                # TypeScript Source Code
│   ├── classes/
│   │   ├── card.model.ts
│   │   └── game.model.ts
│   │
│   ├── constants.ts
│   └── script.ts
│
├── index.html
├── tsconfig.json
└── README.md
```

---

## 📌 Notes

* The game logic is handled using a dedicated `Game` class.
* Each card is represented by a `Card` model.
* Card flip behavior is controlled using CSS classes (`hide` / `show`) without extra wrapper elements.

---

## 🎓 Training Context

This project was implemented as a **TypeScript Task** during the
**NTI MEAN Stack Training Program (2.5 Months)**,
with a focus on:

- Practicing TypeScript fundamentals
- Applying Object-Oriented Programming (OOP)
- Working with DOM manipulation
- Building interactive UI with animations
- Writing clean and structured code
---

## 👤 Author

**Salah**
NTI MEAN Stack Trainee

---

## 📄 License

This project is for educational and training purposes.
