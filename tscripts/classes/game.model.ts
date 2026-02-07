import { Card } from "./card.model.js";

export class Game {
  cards: Card[];
  numberOfAttempts : number;
  successedCards : number;
  hasOneCard : boolean;
  selectedCards : Card[];
  constructor(cards: Card[]) {
    this.cards = cards;
    this.numberOfAttempts = 0;
    this.successedCards = 0;
    this.hasOneCard = false;
    this.selectedCards = [];
  }
  
  addTry() : void {
    this.numberOfAttempts++;
  }
  addSuccess() : void {
    this.successedCards++;
  }

  endGame() : boolean {
    return (this.successedCards === this.cards.length / 2)
  }

  chooseCard(card : Card) : number {
      if (card.isOpened) return -1;
      card.isOpened = true;
      this.selectedCards.push(card);
      this.addTry();
      if (this.selectedCards!.length === 1) {
          return 0;
      }
      else if (this.selectedCards!.length === 2) {
          const [first, second] = this.selectedCards!;
          if (first!.cardId === second!.cardId) {
              this.addSuccess();
              return 1;
          } else {
                first!.isOpened = false;
                second!.isOpened = false;
              return 2;
          }
      }
      return 0;
  }
}