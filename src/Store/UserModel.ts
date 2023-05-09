import { makeObservable, action, observable, computed } from "mobx";
import { HeroModel } from "./HeroModel";
import { CardModel } from "./CardModel";

export type UserProps = {
  hero: HeroModel;
};

export class UserModel {
  _hero: HeroModel;
  _deck: CardModel[] = [];
  _hand: CardModel[] = [];
  _coins: number;

  constructor(hero: HeroModel) {
    this._hero = hero;
    this._coins = 3;

    makeObservable(this, {
      _hero: observable,
      _deck: observable,
      _hand: observable,
      _coins: observable,
      setCoins: action,
      decrementCoins: action,
      hero: computed,
      deck: computed,
      hand: computed,
      isDead: computed,
      coins: computed,
    });
  }

  get hero() {
    return this._hero;
  }

  get deck() {
    return this._deck;
  }

  set deck(value: CardModel[]) {
    console.log(this._hero.name, value);
    this._deck = value;
  }

  get hand() {
    return this._hand;
  }

  set hand(value: CardModel[]) {
    this._hand = value;
  }

  get isDead() {
    return this.hero.health <= 0;
  }

  get coins() {
    return this._coins;
  }

  get health() {
    return this._hero.health;
  }

  set health(value: number) {
    this._hero.health = value;
  }

  setCoins = async (value: number) => {
    if (this._coins === 10) {
      return;
    }
    this._coins = value;
  };

  decrementCoins = async (value: number) => {
    if (this._coins < value) {
      this._coins = 0;
    }

    this._coins -= value;
  };
}
