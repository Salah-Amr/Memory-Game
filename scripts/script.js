var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { names, photos, info, linkedIn } from './constants.js';
import { Card } from "./classes/card.model.js";
import { Game } from "./classes/game.model.js";
const sucAud = new Audio("./src/sounds/success.mp3");
const faiAud = new Audio("./src/sounds/wrong.mp3");
sucAud.volume = 0.3;
faiAud.volume = 0.2;
let isProcessing = false;
let seconds = 0;
let tens = 0;
let appendTens = document.getElementById("tens");
let appendSeconds = document.getElementById("seconds");
let Interval;
function startTimer() {
    return __awaiter(this, void 0, void 0, function* () {
        clearInterval(Interval);
        Interval = setInterval(updateTimer, 10);
    });
}
function updateTimer() {
    tens++;
    if (tens <= 9) {
        appendTens.innerHTML = "0" + tens;
    }
    if (tens > 9) {
        appendTens.innerHTML = tens.toString();
    }
    if (tens > 99) {
        seconds++;
        appendSeconds.innerHTML = "0" + seconds;
        tens = 0;
        appendTens.innerHTML = "0" + 0;
    }
    if (seconds > 9) {
        appendSeconds.innerHTML = seconds.toString();
    }
}
function stopTimer() {
    clearInterval(Interval);
}
let cards = [];
const asc = [];
for (let i = 0; i < 10; i++) {
    asc.push(i, i);
}
function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const tmp = arr[i];
        arr[i] = arr[j];
        arr[j] = tmp;
    }
}
shuffleArray(asc);
for (let i = 0; i < asc.length; i++) {
    let idx = asc[i];
    let card = new Card(`${names[idx]}`, `./src/images/${photos[idx]}`, i + 1, idx, info[idx]);
    cards.push(card);
}
let game = new Game(cards);
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
function showToast(message, classN) {
    Toastify({
        text: message,
        duration: 3000,
        gravity: "top",
        position: "right",
        className: `my-toast ${classN}`,
        close: true
    }).showToast();
}
function checkEndGame() {
    return __awaiter(this, void 0, void 0, function* () {
        if (game.endGame()) {
            stopTimer();
            yield delay(1000);
            let sh = document.getElementById("stSheet");
            sh.href = "./frontend/style2.css";
            let bod = document.body;
            bod.innerHTML = "";
            let h1 = document.createElement("h1");
            h1.innerText = "Memory Game";
            let h2 = document.createElement("h2");
            h2.innerHTML = "<span>Congratulations!</span><br>You've cleared the board";
            h2.id = "congratsMessage";
            let stats = document.createElement("div");
            stats.className = "final-stats";
            stats.innerHTML = `
        <h3>Attempts: <span>${Math.floor(game.numberOfAttempts / 2)}</span></h3>
        <h3>Time: <span>${appendSeconds.innerText}:${appendTens.innerText}</span></h3>
    `;
            let b = document.createElement("button");
            b.innerText = "Play Again";
            b.onclick = () => {
                window.location.reload();
            };
            b.id = "reset";
            let footer = document.createElement("footer");
            footer.innerHTML = `
        <p id="madeBy">Made by: <a href="${linkedIn}" id="Me" target="_blank">Salah Amr</a></p>
        <small>Click name to visit LinkedIn</small>
    `;
            bod.append(h1, h2, stats, b, footer);
        }
    });
}
function resetCard(index, prev) {
    let c = document.getElementById(`${index.id}`);
    c.classList.toggle("hide");
    c.classList.toggle("show");
    cards[index.cardId].isOpened = false;
    c = document.getElementById(`${prev.id}`);
    c.classList.toggle("hide");
    c.classList.toggle("show");
    cards[prev.cardId].isOpened = false;
}
function updateAttempts() {
    document.getElementById('attemptsNumber').innerHTML = Math.floor(game.numberOfAttempts / 2).toString();
}
function updateSuccess() {
    document.getElementById('successNumber').innerHTML = game.successedCards.toString();
}
function showInfo(card) {
    let infoDiv = document.getElementById("cardInfo");
    infoDiv.innerHTML = "";
    let info = card.info;
    let h2 = document.createElement("h2");
    h2.innerText = `About ${card.name} Language`;
    let h3 = document.createElement("h3");
    h3.innerText = info.split("\n")[0];
    h3.id = `${card.name}InfoTitle`;
    infoDiv.appendChild(h3);
    let cnt = 0;
    info.split("\n").slice(1).forEach(line => {
        let p = document.createElement("p");
        p.innerText = line;
        p.id = `${card.name}Info${cnt++}`;
        infoDiv.appendChild(p);
    });
}
function selectCard(index) {
    return __awaiter(this, void 0, void 0, function* () {
        if (isProcessing) {
            showToast("Too many Attempts, Please wait!", 'toast-error');
            return;
        }
        isProcessing = true;
        let c = document.getElementById(`${index}`);
        let ca = cards[index - 1];
        c.classList.toggle("hide");
        c.classList.toggle("show");
        let img = c.querySelector("img");
        let h = c.querySelector("h3");
        img.src = ca.photoUrl;
        img.alt = ca.name;
        h.innerHTML = ca.name;
        let res = game.chooseCard(ca);
        updateAttempts();
        if (res === 1) {
            sucAud.currentTime = 0;
            sucAud.play();
            updateSuccess();
            game.selectedCards = [];
            showInfo(ca);
            checkEndGame();
        }
        else if (res === 2) {
            faiAud.currentTime = 0;
            faiAud.play();
            yield delay(1000);
            const first = game.selectedCards[0];
            game.selectedCards = [];
            resetCard(ca, first);
        }
        isProcessing = false;
    });
}
function resetCards() {
    startTimer();
    let div = document.getElementById("cards");
    let cardDivs = div.querySelectorAll(".card");
    cardDivs.forEach(card => {
        let c = document.getElementById(`${card.id}`);
        c.classList.toggle("hide");
        c.classList.toggle("show");
        let img = c.querySelector("img");
        let h = c.querySelector("h3");
        img.src = "./src/images/q.jpg";
        img.alt = "Question";
        h.innerHTML = "???";
        c.onclick = () => {
            selectCard(parseInt(card.id));
        };
    });
}
function quickLook() {
    return __awaiter(this, void 0, void 0, function* () {
        let div = document.getElementById("cards");
        div.innerHTML = "";
        for (let i = 0; i < asc.length; i++) {
            let ca = cards[i];
            const cardDiv = document.createElement("div");
            cardDiv.classList.add("card", "show");
            cardDiv.id = `${ca === null || ca === void 0 ? void 0 : ca.id}`;
            const img = document.createElement("img");
            img.id = `${ca === null || ca === void 0 ? void 0 : ca.id}image`;
            img.src = `./src/images/${photos[ca.cardId]}`;
            img.alt = `${names[ca.cardId]}`;
            const h3 = document.createElement("h3");
            h3.id = `${ca === null || ca === void 0 ? void 0 : ca.id}name`;
            h3.innerText = `${names[ca.cardId]}`;
            cardDiv.appendChild(img);
            cardDiv.appendChild(h3);
            div.appendChild(cardDiv);
        }
        let infodiv = document.createElement("div");
        infodiv.id = "cardInfo";
        document.body.appendChild(infodiv);
        yield delay(3000);
        resetCards();
    });
}
document.addEventListener("DOMContentLoaded", () => {
    quickLook();
});
//# sourceMappingURL=script.js.map