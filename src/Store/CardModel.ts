import { makeObservable, action, observable, computed } from "mobx";

export type CardProps = {
  name: string;
  imageSrc: string;
  damage: number;
  description: string;
  health: number;
  cost: number;
};

export class CardModel {
  _id: number = -1;
  _name: string = "";
  _description: string = "";
  _imageSrc: string = "";
  _damage: number = 0;
  _health: number = 0;
  _active: boolean = false;
  _cost: number;

  constructor({
    name,
    imageSrc,
    damage,
    health,
    description,
    cost,
  }: CardProps) {
    this._name = name;
    this._imageSrc = imageSrc;
    this._damage = damage;
    this._health = health;
    this._description = description;
    this._cost = cost;

    makeObservable(this, {
      _id: observable,
      _name: observable,
      _description: observable,
      _imageSrc: observable,
      _damage: observable,
      _health: observable,
      _active: observable,
      _cost: observable,
      healthIncrement: action,
      healthDecrement: action,
      name: computed,
      description: computed,
      imageSrc: computed,
      damage: computed,
      health: computed,
      active: computed,
      cost: computed,
      isDead: computed,
      id: computed,
    });
  }

  get name(): string {
    return this._name;
  }

  get description(): string {
    return this._description;
  }

  get imageSrc(): string {
    return this._imageSrc;
  }

  get damage(): number {
    return this._damage;
  }

  get health(): number {
    return this._health;
  }

  get active(): boolean {
    return this._active;
  }

  get cost(): number {
    return this._cost;
  }

  set active(value: boolean) {
    this._active = value;
  }

  set damage(value: number) {
    this._damage = value;
  }

  get isDead(): boolean {
    return this.health === 0;
  }

  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  healthIncrement = (value: number): void => {
    this._health += value;
  };

  healthDecrement = (value: number): void => {
    if (this.health < value) {
      this._health = 0;
      return;
    }

    this._health -= value;
  };
}
