import { makeObservable, observable } from "mobx";
import { HeroProps } from "./HeroModel";
import { HERO_PROPS } from "../config";

export class HeroPullModel {
  _heroes: { name: string; props: HeroProps }[] = [];

  constructor() {
    makeObservable(this, {
      _heroes: observable,
    });
  }

  get heroes() {
    return this._heroes;
  }

  set heroes(value: { name: string; props: HeroProps }[]) {
    this._heroes = value;
  }

  getHeroByName = (name: string) => {
    this._heroes.find((value) => name === value.name);
  };
}

const store = new HeroPullModel();

store.heroes = HERO_PROPS;

export const HeroPullStore = store;
