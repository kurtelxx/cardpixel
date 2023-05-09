import { makeObservable, action, observable, computed } from "mobx";

export type HeroProps = {
  name: string;
  description: string;
  damage: number;
  health: number;
  imageSrc: string;
};

export class HeroModel {
  _name: string;
  _description: string;
  _damage: number;
  _health: number;
  _imageSrc: string;

  constructor({ name, description, damage, health, imageSrc }: HeroProps) {
    this._damage = damage;
    this._description = description;
    this._health = health;
    this._name = name;
    this._imageSrc = imageSrc;

    makeObservable(this, {
      _name: observable,
      _description: observable,
      _damage: observable,
      _health: observable,
      _imageSrc: observable,
      name: computed,
      description: computed,
      damage: computed,
      health: computed,
      imageSrc: computed,
      decrementHealth: action,
    });
  }

  get name(): string {
    return this._name;
  }
  get description(): string {
    return this._description;
  }
  get damage(): number {
    return this._damage;
  }
  get health(): number {
    return this._health;
  }
  get imageSrc(): string {
    return this._imageSrc;
  }

  set health(value: number) {
    this._health = value;
  }

  decrementHealth = (value: number) => {
    if (this._health <= value) {
      this._health = 0;
    }

    this._health -= value;
  };
}
