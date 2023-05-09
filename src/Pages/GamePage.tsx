import React, { useEffect, useState } from "react";
import { Layout } from "../Components/index";

import "./styles.less";
import "./cards.less";
import { SceneModel } from "../Store/SceneModel";
import { observer } from "mobx-react-lite";
import { CardModel } from "../Store/CardModel";
import {
  LOSE_MESSAGE,
  TABLE_SIZE,
  WIN_MESSAGE,
  IS_RANDOM_INIT,
} from "../config";

export const GamePage: React.FC<{
  store: SceneModel;
  switchStage: () => void;
}> = observer(({ store, switchStage }) => {
  useEffect(() => {
    if (store.ai.isDead) {
      alert(WIN_MESSAGE);
      if (IS_RANDOM_INIT) {
        return;
      }
      switchStage();
      return;
    }
    if (store.user.isDead) {
      alert(LOSE_MESSAGE);
      if (IS_RANDOM_INIT) {
        return;
      }
      switchStage();
      return;
    }
  });

  const [selectedUserCardId, setSelectedUserCardId] = useState<number>(-1);

  const moveUserCardToTable = (card: CardModel) => {
    store.table.userCards = [...store.table.userCards, card];
  };

  const pickUserCardById = async (id: number) => {
    if (store.table.userCards.length >= TABLE_SIZE) {
      return;
    }
    let flag = true;
    let pickedCard: CardModel;

    const cost = store.user.hand.find((card) => card.id === id).cost;
    if (store.user.coins >= cost) {
      store.user.decrementCoins(cost);
    } else {
      return;
    }
    store.user.hand = await store.user.hand.filter((card) => {
      if (flag && card.id === id) {
        pickedCard = card;
        flag = false;
        return false;
      }
      return true;
    });

    moveUserCardToTable(pickedCard);
  };

  const selectUserCard = (id: number) => {
    if (!store.isUserMove) {
      return;
    }

    setSelectedUserCardId(id);
  };

  const damageAICard = (id: number) => {
    if (
      selectedUserCardId === -1 ||
      !store.isUserMove ||
      store.table.aiCards.length === 0
    ) {
      return;
    }

    let flag = true;
    let userCard: CardModel;

    store.table.userCards = store.table.userCards.filter((card) => {
      if (flag && card.id === selectedUserCardId) {
        userCard = card;
        flag = false;
        return false;
      }
      return true;
    });

    store.table.aiCards = store.table.aiCards.filter((card) => {
      if (card.id === id) {
        card.healthDecrement(userCard.damage);
        userCard.healthDecrement(card.damage);

        if (card.isDead) {
          return false;
        }
        return true;
      }
      return true;
    });
    setSelectedUserCardId(-1);

    if (userCard.isDead) {
      return;
    }
    userCard._active = false;
    store.table.userCards = [...store.table.userCards, userCard];
  };

  const damageAIHero = () => {
    if (
      selectedUserCardId === -1 ||
      !store.isUserMove ||
      store.table.aiCards.length > 0
    ) {
      return;
    }

    let flag = true;
    let userCard: CardModel;

    store.table.userCards = store.table.userCards.filter((card) => {
      if (flag && card.id === selectedUserCardId) {
        userCard = card;
        flag = false;
        return false;
      }
      return true;
    });

    store.ai.hero.decrementHealth(userCard.damage);
    userCard.healthDecrement(store.ai.hero.damage);

    if (userCard.isDead) {
      return;
    }
    userCard._active = false;
    store.table.userCards = [...store.table.userCards, userCard];
  };

  return (
    <>
      <Layout.Container backgroundColor="blue" isColumn={true}>
        <div className={"move"}>
          {store.isUserFilling || store.isUserMove ? (
            <button
              onClick={() => {
                if (store.isUserFilling) {
                  store.toAIFilling();
                  return;
                }

                if (store.isUserMove) {
                  store.toAIMove();
                  return;
                }
              }}
            >
              {store.message}
            </button>
          ) : (
            store.message
          )}
        </div>
        <div className={"table-background"}>
          <div className={"user-side"}>
            <div className={"left"}>
              {store.ai.hand.map((element) => (
                <div
                  className="small-card"
                  style={{
                    backgroundImage: "url(/cards/emptyhero.jpg)",
                  }}
                ></div>
              ))}
            </div>
            <div className={"right"}>
              <div
                className="small-card"
                style={{
                  backgroundImage: `url(/${store?.ai?.hero?.imageSrc})`,
                }}
                onClick={() => damageAIHero()}
              >
                <div className={"name"}>{store?.ai?.hero?.name}</div>
                <div className={"desc"}>{store?.ai?.hero?.description}</div>
                <div className={"health"}>{store?.ai?.hero?.health}</div>
                <div className={"damage"}>{store?.ai?.hero?.damage}</div>
              </div>
              <div
                className={"circle"}
                style={{ backgroundImage: `url(cards/coin.png)` }}
              >
                {store?.ai?.coins}
              </div>
            </div>
          </div>
          <div className={"center"}>
            <div className={"deck deck-left"}>{store?.ai?.deck?.length}</div>
            {store.table.aiCards.map((element) => (
              <div
                className="small-card"
                style={{ backgroundImage: `url(/${element.imageSrc})` }}
                onClick={() => {
                  damageAICard(element.id);
                }}
              >
                <div className={"name"}>{element?.name}</div>
                <div className={"desc"}>{element?.description}</div>
                <div className={"health"}>{element?.health}</div>
                <div className={"damage"}>{element?.damage}</div>
                <div className={"cost"}>{element?.cost}</div>
              </div>
            ))}
          </div>
          <div className={"center"}>
            <div className={"deck deck-right"}>{store?.user?.deck?.length}</div>
            {store.table.userCards.map((element) => (
              <div
                className={`small-card ${
                  element.active ? "blue-card" : "red-card"
                }`}
                style={{ backgroundImage: `url(/${element.imageSrc})` }}
                onClick={() => {
                  if (!element.active) {
                    return;
                  }
                  selectUserCard(element.id);
                }}
              >
                <div className={"name"}>{element?.name}</div>
                <div className={"desc"}>{element?.description}</div>
                <div className={"health"}>{element?.health}</div>
                <div className={"damage"}>{element?.damage}</div>
                <div className={"cost"}>{element?.cost}</div>
              </div>
            ))}
          </div>
          <div className={"user-side revert"}>
            <div className={"left"}>
              {store.user.hand.map((element) => (
                <div
                  className={`small-card ${
                    store.user.coins >= element.cost ? "blue-card" : "red-card"
                  }`}
                  style={{
                    backgroundImage: `url(/${element?.imageSrc})`,
                  }}
                  onClick={async () => {
                    if (!store.isUserFilling) {
                      return;
                    }
                    await pickUserCardById(element.id);
                  }}
                >
                  <div className={"name"}>{element?.name}</div>
                  <div className={"desc"}>{element?.description}</div>
                  <div className={"health"}>{element?.health}</div>
                  <div className={"damage"}>{element?.damage}</div>
                  <div className={"cost"}>{element?.cost}</div>
                </div>
              ))}
            </div>
            <div className={"right"}>
              <div
                className={"circle"}
                style={{
                  backgroundImage: `url(cards/coin.png)`,
                }}
              >
                {store.user.coins}
              </div>

              <div
                className="small-card"
                style={{
                  backgroundImage: `url(/${store?.user?.hero?.imageSrc})`,
                }}
              >
                <div className={"name"}>{store?.user?.hero?.name}</div>
                <div className={"desc"}>{store?.user?.hero?.description}</div>
                <div className={"health"}>{store?.user?.hero?.health}</div>
                <div className={"damage"}>{store?.user?.hero?.damage}</div>
              </div>
            </div>
          </div>
        </div>
      </Layout.Container>
    </>
  );
});
