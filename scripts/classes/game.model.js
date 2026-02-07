import { Card } from "./card.model.js";
export class Game {
    constructor(cards) {
        this.cards = cards;
        this.numberOfAttempts = 0;
        this.successedCards = 0;
        this.hasOneCard = false;
        this.selectedCards = [];
    }
    addTry() {
        this.numberOfAttempts++;
    }
    addSuccess() {
        this.successedCards++;
    }
    endGame() {
        return (this.successedCards === this.cards.length / 2);
    }
    chooseCard(card) {
        if (card.isOpened)
            return -1;
        card.isOpened = true;
        this.selectedCards.push(card);
        this.addTry();
        if (this.selectedCards.length === 1) {
            return 0;
        }
        else if (this.selectedCards.length === 2) {
            const [first, second] = this.selectedCards;
            if (first.cardId === second.cardId) {
                this.addSuccess();
                return 1;
            }
            else {
                first.isOpened = false;
                second.isOpened = false;
                return 2;
            }
        }
        return 0;
    }
}
//# sourceMappingURL=game.model.js.map