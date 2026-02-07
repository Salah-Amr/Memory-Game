import { Card } from "./card.model.js";
export declare class Game {
    cards: Card[];
    numberOfAttempts: number;
    successedCards: number;
    hasOneCard: boolean;
    selectedCards: Card[];
    constructor(cards: Card[]);
    addTry(): void;
    addSuccess(): void;
    endGame(): boolean;
    chooseCard(card: Card): number;
}
//# sourceMappingURL=game.model.d.ts.map