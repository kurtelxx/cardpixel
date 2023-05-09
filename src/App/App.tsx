import React from "react";

import { GamePage } from "../Pages/GamePage";
import { HeroPage } from "../Pages/HeroPage";
import { CardsPage } from "../Pages/CardsPage";

import { Switch, Route, useHistory } from "react-router-dom";

import { Layout } from "../Components/index";

import "./styles.less";
import { UserModel } from "../Store/UserModel";
import { HeroModel } from "../Store/HeroModel";
import { HeroPullStore } from "../Store/HeroPullModel";
import { CardModel } from "../Store/CardModel";
import { CardPullStore } from "../Store/CardPullModel";
import { SceneModel } from "../Store/SceneModel";
import { TableModel } from "../Store/TableModel";
import { DECK_SIZE, IS_RANDOM_INIT } from "../config";
import { NotFoundPage } from "../Pages/NotFoundPage/NotFoundPage";
import { LandingPage } from "../Pages/LandingPage/LandingPage";

export enum Stages {
  Hero = "chooseHero",
  Cards = "chooseCards",
  Game = "game",
  Landing = "",
}

export function App(): JSX.Element {
  const history = useHistory();

  const stageContol = (stage: Stages) => {
    history.push(`/${stage}`);
  };

  let userStore: UserModel;

  const setHero = (name: string) => {
    const hero = HeroPullStore.heroes.find((value) => value.name === name);
    const HeroProps = new HeroModel(hero.props);
    userStore = new UserModel(HeroProps);
  };

  let sceneStore: SceneModel;

  const setScene = () => {
    let AIStore: UserModel = new UserModel(
      new HeroModel(
        HeroPullStore.heroes[
          randomInteger(0, HeroPullStore.heroes.length - 1)
        ].props
      )
    );

    let AIDeck: CardModel[] = [];

    for (let i = 0; i < DECK_SIZE; i++) {
      const props =
        CardPullStore.cards[randomInteger(0, CardPullStore.cards.length - 1)]
          .props;

      const card = new CardModel(props);
      card.id = randomInteger(1, 1000000);
      AIDeck.push(card);
    }

    AIStore.deck = AIDeck;

    sceneStore = new SceneModel({ ai: AIStore, user: userStore });
    sceneStore.table = new TableModel({ aiCards: [], userCards: [] });
  };

  // инициализация рандома
  let AITempStore: UserModel = new UserModel(
    new HeroModel(
      HeroPullStore.heroes[
        randomInteger(0, HeroPullStore.heroes.length - 1)
      ].props
    )
  );

  let AITempDeck: CardModel[] = [];

  for (let i = 0; i < DECK_SIZE; i++) {
    const props =
      CardPullStore.cards[randomInteger(0, CardPullStore.cards.length - 1)]
        .props;

    const card = new CardModel(props);
    card.id = randomInteger(1, 1000000);
    AITempDeck.push(card);
  }

  AITempStore.deck = AITempDeck;

  let TempStore: UserModel = new UserModel(
    new HeroModel(
      HeroPullStore.heroes[
        randomInteger(0, HeroPullStore.heroes.length - 1)
      ].props
    )
  );

  let TempDeck: CardModel[] = [];

  for (let i = 0; i < DECK_SIZE; i++) {
    const props =
      CardPullStore.cards[randomInteger(0, CardPullStore.cards.length - 1)]
        .props;

    const card = new CardModel(props);

    card.id = randomInteger(1, 1000000);
    TempDeck.push(card);
  }

  TempStore.deck = TempDeck;

  const tempScene = new SceneModel({ ai: AITempStore, user: TempStore });
  tempScene.table = new TableModel({ aiCards: [], userCards: [] });

  // конец инициализации рандома

  return (
    <div className={"App"}>
      <Layout>
        <Switch>
          <Route
            exact
            path={`/${Stages.Game}`}
            component={() => (
              <GamePage
                store={IS_RANDOM_INIT ? tempScene : sceneStore}
                switchStage={() => stageContol(Stages.Landing)}
              />
            )}
          />
          <Route
            exact
            path={`/${Stages.Hero}`}
            component={() => (
              <HeroPage
                setHero={setHero}
                switchStage={() => stageContol(Stages.Cards)}
              />
            )}
          />
          <Route
            exact
            path={`/${Stages.Cards}`}
            component={() => (
              <CardsPage
                store={userStore}
                setScene={setScene}
                switchStage={() => stageContol(Stages.Game)}
              />
            )}
          />

          <Route
            exact
            path={`/`}
            component={() => (
              <LandingPage toChooseHero={() => stageContol(Stages.Hero)} />
            )}
          />
          <Route component={() => <NotFoundPage />} />
        </Switch>
      </Layout>
    </div>
  );
}

export function randomInteger(min: number, max: number) {
  let rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand);
}
