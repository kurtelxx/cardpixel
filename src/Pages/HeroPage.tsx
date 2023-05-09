import React from "react";
import { Layout } from "../Components/index";
import { HeroPullStore } from "../Store/HeroPullModel";

import "./cards.less";
import "./styles.less";

export const HeroPage: React.FC<{
  switchStage: () => void;
  setHero: (name: string) => void;
}> = ({ switchStage, setHero }) => {
  return (
    <>
      <Layout.Container backgroundColor="blue" isColumn={true}>
        <div className={"background gap"}>
          {HeroPullStore.heroes.map((element) => (
            <div
              className="big-card"
              style={{ backgroundImage: `url(/${element.props.imageSrc})` }}
              onClick={() => {
                switchStage();
                setHero(element.props.name);
              }}
            >
              <div className={"name"}>{element.props.name}</div>
              <div className={"desc"}>{element.props.description}</div>
              <div className={"health"}>{element.props.health}</div>
              <div className={"damage"}>{element.props.damage}</div>
            </div>
          ))}
        </div>
      </Layout.Container>
    </>
  );
};
