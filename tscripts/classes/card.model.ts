export class Card {
  name: string;
  photoUrl: string;
  isOpened: boolean;
  id: number;
  cardId: number;
  info: string;
  constructor(name: string, photoUrl: string, id: number, cardId : number, info: string) {
    this.name = name;
    this.photoUrl = photoUrl;
    this.isOpened = false;
    this.id = id;
    this.cardId = cardId;
    this.info = info;
  }
}