import { CardProps } from "./Store/CardModel";
import { HeroProps } from "./Store/HeroModel";

export const IS_RANDOM_INIT = false; // false или true

export const DECK_SIZE = 10;
export const HAND_SIZE = 6;
export const TABLE_SIZE = 6;

export const MIN_COINS_COUNT = 3;
export const MAX_COINS_COUNT = 10;

export const WIN_MESSAGE = "Поздравляем, вы победили!";
export const LOSE_MESSAGE = "Поражение! Мы и не сомневались)";

export const USER_FILLING_STAGE_BUTTON_TEXT = "Карты на стол!";
export const USER_MOVE_STAGE_BUTTON_TEXT = "Передать ход";
export const AI_MOVE_STAGE_BUTTON_TEXT = "Ход противника";

export const HERO_PROPS: { name: string; props: HeroProps }[] = [
  {
    name: "Инквизитор",
    props: {
      damage: 6,
      health: 30,
      name: "Инквизитор",
      description: "Описание инквизитора",
      imageSrc: "cards/hero1.jpg",
    },
  },
  {
    name: "Суккуб",
    props: {
      damage: 3,
      health: 30,
      name: "Суккуб",
      description: "Описание инквизитора",
      imageSrc: "cards/hero2.jpg",
    },
  },
  {
    name: "Пиромант",
    props: {
      damage: 5,
      health: 30,
      name: "Пиромант",
      description: "Описание инквизитора",
      imageSrc: "cards/hero3.jpg",
    },
  },
  {
    name: "Элементалист",
    props: {
      damage: 7,
      health: 30,
      name: "Элементалист",
      description: "Описание инквизитора",
      imageSrc: "cards/hero4.jpg",
    },
  },
  {
    name: "Берсерк",
    props: {
      damage: 1,
      health: 30,
      name: "Берсерк",
      description: "Описание инквизитора",
      imageSrc: "cards/hero5.jpg",
    },
  },
  {
    name: "Вампир",
    props: {
      damage: 5,
      health: 30,
      name: "Вампир",
      description: "Описание инквизитора",
      imageSrc: "cards/hero6.jpg",
    },
  },
  {
    name: "Ассасин",
    props: {
      damage: 6,
      health: 30,
      name: "Ассасин",
      description: "Описание инквизитора",
      imageSrc: "cards/hero7.jpg",
    },
  },
  {
    name: "Друид",
    props: {
      damage: 3,
      health: 30,
      name: "Друид",
      description: "Описание инквизитора",
      imageSrc: "cards/hero8.jpg",
    },
  },
];

export const CARD_PROPS: CardProps[] = [
  {
    name: "Анна-Мария",
    health: 5,
    damage: 1,
    description: "Описание",
    imageSrc: "cards/card_1.jpg",
    cost: 4,
  },
  {
    name: "Елизавета",
    health: 4,
    damage: 2,
    description: "Описание",
    imageSrc: "cards/card_2.jpg",
    cost: 2,
  },
  {
    name: "Кирилл",
    health: 5,
    damage: 1,
    description: "Описание",
    imageSrc: "cards/card_3.jpg",
    cost: 3,
  },
  {
    name: "Бесполезногиня",
    health: 1,
    damage: 0,
    description: "Описание",
    imageSrc: "cards/card_4.jpg",
    cost: 0,
  },
  {
    name: "Саня",
    health: 10,
    damage: 5,
    description: "Описание",
    imageSrc: "cards/card_6.jpg",
    cost: 7,
  },
  {
    name: "КиллФоРил",
    health: 2,
    damage: 2,
    description: "Описание",
    imageSrc: "cards/card_7.jpg",
    cost: 2,
  },
  {
    name: "Димас",
    health: 4,
    damage: 3,
    description: "Описание",
    imageSrc: "cards/card_8.jpg",
    cost: 5,
  },
  {
    name: "Алина",
    health: 1.5,
    damage: 3,
    description: "Описание",
    imageSrc: "cards/card_5.jpg",
    cost: 2,
  },
  {
    name: "Юля",
    health: 3,
    damage: 1,
    description: "Описание",
    imageSrc: "cards/card_9.jpg",
    cost: 3,
  },
  {
    name: "Николай",
    health: 5,
    damage: 3,
    description: "Описание",
    imageSrc: "cards/card_10.jpg",
    cost: 6,
  },
  {
    name: "Джон",
    health: 4,
    damage: 2,
    description: "Описание",
    imageSrc: "cards/card_11.jpg",
    cost: 3,
  },
  {
    name: "Антонито",
    health: 10,
    damage: 3,
    description: "Описание",
    imageSrc: "cards/card_12.jpg",
    cost: 8,
  },
  {
    name: "Катя",
    health: 2,
    damage: 7,
    description: "Описание",
    imageSrc: "cards/card_13.jpg",
    cost: 5,
  },
  {
    name: "Хунь-Чунь",
    health: 5,
    damage: 5,
    description: "Описание",
    imageSrc: "cards/card_14.jpg",
    cost: 5,
  },
  {
    name: "Кратос",
    health: 6,
    damage: 5,
    description: "Описание",
    imageSrc: "cards/card_15.jpg",
    cost: 9,
  },
  {
    name: "Яна",
    health: 9,
    damage: 6,
    description: "Описание",
    imageSrc: "cards/card_16.jpg",
    cost: 10,
  },
  {
    name: "Сок 'Добрый'",
    health: 5,
    damage: 10,
    description: "Описание",
    imageSrc: "cards/card_17.jpg",
    cost: 8,
  },
  {
    name: "Тупич",
    health: 7,
    damage: 4,
    description: "Описание",
    imageSrc: "cards/card_18.jpg",
    cost: 6,
  },
  {
    name: "Серега",
    health: 5,
    damage: 3,
    description: "Описание",
    imageSrc: "cards/card_19.jpg",
    cost: 4.5,
  },
  {
    name: "Хуан",
    health: 3,
    damage: 2,
    description: "Описание",
    imageSrc: "cards/card_20.jpg",
    cost: 1,
  },
];
