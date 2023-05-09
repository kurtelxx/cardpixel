import { action, computed, makeObservable, observable } from "mobx";
import { UserModel } from "./UserModel";
import { TableModel } from "./TableModel";
import { randomInteger } from "../App/App";
import { CardModel } from "./CardModel";
import {
  AI_MOVE_STAGE_BUTTON_TEXT,
  HAND_SIZE,
  MAX_COINS_COUNT,
  MIN_COINS_COUNT,
  TABLE_SIZE,
  USER_FILLING_STAGE_BUTTON_TEXT,
  USER_MOVE_STAGE_BUTTON_TEXT,
} from "../config";

export type SceneProps = {
  user: UserModel;
  ai: UserModel;
};

export enum Stages {
  UserFilling = "userFilling",
  AIFilling = "AIFilling",
  UserMove = "userMove",
  AIMove = "aiMove",
}

export class SceneModel {
  _user: UserModel = {} as UserModel;
  _ai: UserModel = {} as UserModel;
  _table: TableModel = {} as TableModel;
  _stage: Stages;
  _moveCounter: number;
  _buttonMessage: string;

  constructor({ ai, user }: SceneProps) {
    this._ai = ai;
    this._user = user;
    this._stage = Stages.UserFilling;
    this._moveCounter = 0;
    this._buttonMessage = "Карты на стол!";

    this.moveCardsFromDecksToHands();

    makeObservable(this, {
      _user: observable,
      _ai: observable,
      _stage: observable,
      _moveCounter: observable,
      _buttonMessage: observable,
      endStage: action,
      toAIFilling: action,
      toAIMove: action,
      toUserFilling: action,
      toUserMove: action,
      moveAICardFromDeckToHand: action,
      moveUserCardFromDeckToHand: action,
      moveCardsFromDecksToHands: action,
      user: computed,
      ai: computed,
      table: computed,
      isUserMove: computed,
      isAIFilling: computed,
      isAIMove: computed,
      isUserFilling: computed,
    });
  }

  moveCardsFromDecksToHands = () => {
    this.moveAICardFromDeckToHand();
    this.moveUserCardFromDeckToHand();
  };

  moveAICardFromDeckToHand = () => {
    if (this._ai.deck.length === 0) {
      this._ai.health = this._ai.health - 2;
      return;
    }

    let flag = true;
    let pickedCard: CardModel;
    const randomIndex = randomInteger(0, this._ai.deck.length - 1);
    this._ai.deck = this._ai.deck.filter((card, idx) => {
      if (flag && idx === randomIndex) {
        pickedCard = card;
        flag = false;
        return false;
      }
      return true;
    });

    if (this.ai.hand.length >= HAND_SIZE) {
      return;
    }

    this._ai.hand = [...this._ai.hand, pickedCard];
  };

  moveUserCardFromDeckToHand = () => {
    if (this.user.deck.length === 0) {
      this.user.health = this.user.health - 2;
      return;
    }

    let flag = true;
    let pickedCard: CardModel;
    const randomIndex = randomInteger(0, this._user.deck.length - 1);
    this._user.deck = this._user.deck.filter((card, idx) => {
      if (flag && idx === randomIndex) {
        pickedCard = card;
        flag = false;
        return false;
      }
      return true;
    });

    if (this._user.hand.length >= HAND_SIZE) {
      return;
    }

    this._user.hand = [...this._user.hand, pickedCard];
  };

  get user() {
    return this._user;
  }

  get message() {
    return this._buttonMessage;
  }

  get ai() {
    return this._ai;
  }

  get table() {
    return this._table;
  }

  set user(value: UserModel) {
    this._user = value;
  }

  set ai(value: UserModel) {
    this._ai = value;
  }

  set table(value: TableModel) {
    this._table = value;
  }

  get isUserMove() {
    return this._stage === Stages.UserMove;
  }

  get isAIMove() {
    return this._stage === Stages.AIMove;
  }

  get isUserFilling() {
    return this._stage === Stages.UserFilling;
  }

  get isAIFilling() {
    return this._stage === Stages.AIFilling;
  }

  endStage = () => {
    this._moveCounter += 1;

    let coins: number;
    if (this._moveCounter > MAX_COINS_COUNT - MIN_COINS_COUNT) {
      coins = MAX_COINS_COUNT;
    } else {
      coins = MIN_COINS_COUNT + this._moveCounter;
    }
    this.ai.setCoins(coins);
    this.user.setCoins(coins);

    let userFlag = true;
    let userCard: CardModel;

    const userId = randomInteger(0, this._table.userCards.length - 1);

    this._table.userCards = this._table.userCards.filter((card, idx) => {
      if (userFlag && idx === userId) {
        userCard = card;
        userFlag = false;
        return false;
      }
      return true;
    });

    let aiFlag = true;
    let aiCard: CardModel;

    const aiId = randomInteger(0, this._table.aiCards.length - 1);

    this._table.aiCards = this._table.aiCards.filter((card, idx) => {
      if (aiFlag && idx === aiId) {
        aiCard = card;
        aiFlag = false;
        return false;
      }
      return true;
    });

    if (userCard) {
      userCard.healthDecrement(this._ai.hero.damage);
      this._ai.hero.decrementHealth(userCard.damage);

      if (!userCard.isDead) {
        this._table.userCards = [...this._table.userCards, userCard];
      }
    } else {
      this._ai.hero.decrementHealth(this._user.hero.damage);
      this._user.hero.decrementHealth(this._ai.hero.damage);
    }

    if (aiCard) {
      aiCard.healthDecrement(this._user.hero.damage);
      this._user.hero.decrementHealth(aiCard.damage);

      if (!aiCard.isDead) {
        this._table.aiCards = [...this._table.aiCards, aiCard];
      } else {
        this._user.hero.decrementHealth(this._user.hero.damage);
        this._ai.hero.decrementHealth(this._ai.hero.damage);
      }
    }

    this.moveCardsFromDecksToHands();
  };

  toAIFilling = () => {
    this._stage = Stages.AIFilling;

    this._table._aiCards = this._table._aiCards.map((card) => {
      const temp = card;
      temp.active = true;

      return temp;
    });

    const moveAICardToTable = (card: CardModel) => {
      this.table.aiCards = [...this.table.aiCards, card];
    };

    const pickAICardById = async (id: number) => {
      let flag = true;
      let pickedCard: CardModel;

      this._table._aiCards = this._table._aiCards.map((card) => {
        const temp = card;
        temp.active = true;

        return temp;
      });

      let cost = -1;
      this._ai.hand.forEach((card) => {
        if (card.id === id) {
          cost = card.cost;
        }
      });
      if (this._ai.coins < cost || this._table.aiCards.length >= TABLE_SIZE) {
        return;
      }
      await this.ai.decrementCoins(cost);
      this._ai.hand = await this._ai.hand.filter((card) => {
        if (flag && card.id === id) {
          pickedCard = card;
          flag = false;
          return false;
        }
        return true;
      });

      moveAICardToTable(pickedCard);
    };

    this._ai.hand.forEach((card) => {
      pickAICardById(card.id);
    });

    this.toUserMove();
  };

  toUserFilling = () => {
    this._buttonMessage = USER_FILLING_STAGE_BUTTON_TEXT;
    this._stage = Stages.UserFilling;
    this._table._userCards = this._table._userCards.map((card) => {
      const temp = card;
      temp.active = true;

      return temp;
    });
    this.endStage();
  };

  toAIMove = () => {
    this._buttonMessage = AI_MOVE_STAGE_BUTTON_TEXT;
    this._stage = Stages.AIMove;

    if (
      this.table.aiCards.length === 0 ||
      !this.table.aiCards.some((card) => card.active)
    ) {
      this.toUserFilling();
      return;
    }

    const getAiCard = (id: number): CardModel => {
      let flag = true;
      let aiCard: CardModel;

      this._table.aiCards = this._table.aiCards.filter((card) => {
        if (flag && card.active && card.id === id) {
          aiCard = card;
          flag = false;
          return false;
        }
        return true;
      });

      return aiCard;
    };

    const getUserCard = (): CardModel => {
      let flag = true;
      let userCard: CardModel;

      const id = randomInteger(0, this._table.userCards.length - 1);

      this._table.userCards = this._table.userCards.filter((card, idx) => {
        if (flag && idx === id) {
          userCard = card;
          flag = false;
          return false;
        }
        return true;
      });

      return userCard;
    };

    const damageUserHero = (id: number) => {
      const aiCard = getAiCard(id);

      if (!aiCard) {
        return;
      }

      this._user.hero.decrementHealth(aiCard.damage);
      aiCard.healthDecrement(this._user.hero.damage);

      if (!aiCard.isDead) {
        this._table.aiCards = [...this._table.aiCards, aiCard];
      }
    };

    const damageUserCard = (id: number) => {
      const aiCard = getAiCard(id);

      if (!aiCard) {
        return;
      }
      const userCard = getUserCard();

      aiCard.healthDecrement(userCard.damage);
      userCard.healthDecrement(aiCard.damage);

      if (!aiCard.isDead) {
        aiCard.active = false;
        this._table.aiCards = [...this._table.aiCards, aiCard];
      }

      if (!userCard.isDead) {
        this._table.userCards = [...this._table.userCards, userCard];
      }
    };

    this._table.aiCards.forEach((card) => {
      if (this._table.userCards.length === 0) {
        damageUserHero(card.id);
      } else {
        damageUserCard(card.id);
      }
    });

    this.toUserFilling();
  };

  toUserMove = () => {
    this._stage = Stages.UserMove;
    this._buttonMessage = USER_MOVE_STAGE_BUTTON_TEXT;
  };
}
