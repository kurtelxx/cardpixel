import { makeObservable, observable } from "mobx";
import { CardModel, CardProps } from "./CardModel";
import { CARD_PROPS } from "../config";

export class CardPullModel {
  _cards: { model: CardModel; props: CardProps }[] = [];

  constructor() {
    makeObservable(this, {
      _cards: observable,
    });
  }

  get cards() {
    return this._cards;
  }

  set cards(value: { model: CardModel; props: CardProps }[]) {
    this._cards = value;
  }

  getCardByName = (name: string) => {
    this._cards.find((value) => value.model.name === name);
  };
}

const store = new CardPullModel();

store.cards = CARD_PROPS.map((element) => {
  return { props: Object.assign({}, element), model: new CardModel(element) };
});

export const CardPullStore = store;
