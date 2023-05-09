import React, { useEffect } from "react";
import { Layout } from "../Components/index";
import { CardPullStore } from "../Store/CardPullModel";

import "./styles.less";
import "./cards.less";
import "./cardsPage.less";
import { observer } from "mobx-react-lite";
import { UserModel } from "../Store/UserModel";
import { CardModel } from "../Store/CardModel";
import { randomInteger } from "../App/App";
import { DECK_SIZE } from "../config";

export const CardsPage: React.FC<{
  switchStage: () => void;
  setScene: () => void;
  store: UserModel;
}> = observer(({ switchStage, setScene, store }) => {
  useEffect(() => {
    if (store.deck.length >= DECK_SIZE) {
      setScene();
      switchStage();
    }
  });

  return (
    <>
      <Layout.Container backgroundColor="blue" isColumn={true}>
        <div className={"background gap"}>
          <div className="left">
            {CardPullStore.cards.map((element) => (
              <div
                className="big-card"
                style={{ backgroundImage: `url(/${element.props.imageSrc})` }}
                onClick={() => {
                  const card = new CardModel(element.props);
                  card.id = randomInteger(1, 1000000000);
                  store.deck = [...store.deck, card];
                }}
              >
                <div className={"name"}>{element.props.name}</div>
                <div className={"desc"}>{element.props.description}</div>
                <div className={"health"}>{element.props.health}</div>
                <div className={"damage"}>{element.props.damage}</div>
                <div className={"cost"}>{element.props.cost}</div>
              </div>
            ))}
          </div>
          <div className="right">
            {store.deck.map((element) => (
              <div
                className="big-card"
                style={{ backgroundImage: `url(/${element.imageSrc})` }}
                onClick={() => {
                  let flag = true;
                  store.deck = store.deck.filter((card) => {
                    if (flag && card.id === element.id) {
                      flag = false;
                      return false;
                    }
                    return true;
                  });
                }}
              >
                <div className={"name"}>{element.name}</div>
                <div className={"desc"}>{element.description}</div>
                <div className={"health"}>{element.health}</div>
                <div className={"damage"}>{element.damage}</div>
                <div className={"cost"}>{element.cost}</div>
              </div>
            ))}
          </div>
        </div>
      </Layout.Container>
    </>
  );
});
