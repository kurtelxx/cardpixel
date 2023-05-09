import { makeObservable, observable } from "mobx";
import { CardModel } from "./CardModel";

export type TableProps = {
    userCards: CardModel[];
    aiCards: CardModel[];
};

export class TableModel {
    _aiCards: CardModel[];
    _userCards: CardModel[];


    constructor({ aiCards, userCards }: TableProps) {

        this._aiCards = aiCards;
        this._userCards = userCards

        makeObservable(this, {
            _aiCards: observable,
            _userCards: observable
        });

    }

    get aiCards() {
        return this._aiCards
    }

    get userCards() {
        return this._userCards
    }

    set aiCards(value: CardModel[]) {
        this._aiCards = value;
    }

    set userCards(value: CardModel[]) {
        this._userCards = value;
    }

}
