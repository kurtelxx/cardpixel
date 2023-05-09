import React from "react";
import { Layout } from "../../Components/index";

import "./styles.less";
import { HeroPullStore } from "../../Store/HeroPullModel";
import { randomInteger } from "../../App/App";

const heroNumber = randomInteger(0, HeroPullStore.heroes.length - 1);

const handleClickScroll = (id: string) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
};

export const LandingPage: React.FC<{ toChooseHero: () => void }> = ({
  toChooseHero,
}) => {
  return (
    <>
      <Layout.Container>
        <button
          onClick={() => handleClickScroll("section0")}
          className={"to-top"}
        >TOP</button>
        <div id={"section0"} className={"landing landing-background"}>
          <div className={"header blue-card"}>
            <div className={"image-container"}>
              <a href={"https://discord.gg/UeUZHGW8xe"}>
                <img src={"/landing/github.svg"} />
              </a>
              <a href={"https://t.me/kurtelx"}>
                <img src={"/landing/telegram.svg"} />
              </a>
            </div>
          </div>
          <div className={"welcome-container"}>
            <span>CARDPIXEL</span>
            <button onClick={toChooseHero}>PLAY</button>
            <button onClick={() => handleClickScroll("section1")}>
              WELCOME
            </button>
            <button onClick={() => handleClickScroll("section2")}>HELP</button>
          </div>
        </div>
        <div
          id={"section1"}
          className={"landing landing-background"}
          style={{}}
        >
          <div className={"landing-container"}>
            <div className={"landing-content blue-card"}>
              <div style={{ textAlign: "center" }}>
                <h1>Welcome to Cardpixel</h1>
              </div>
              <span style={{ fontSize: "1.3em" }}>
                Я рад представить вашему вниманию уникальную игру, в которой вы
                можете играть за восемь разных персонажей. Каждый из них имеет
                свою уникальную цель для сражения, а также особенности и
                запоминающуюся внешность. В игре есть множество уникальных карт
                с продуманным игровым балансом. Вам нужно выбрать персонажа,
                выбрать карту и встать против компьютерного противника на
                игровом поле. Ваша задача - остаться в живых! Если вы
                заинтересованы в испытании своих способностей, мы рекомендуем
                вам пройти обучение.
              </span>
            </div>
          </div>
          <div className={"landing-container"}>
            <div className={""}>
              <div
                className="big-card red-card"
                style={{
                  backgroundImage: `url(/${HeroPullStore.heroes[heroNumber].props.imageSrc})`,
                }}
                onClick={toChooseHero}
              >
                <div className={"name"}>
                  {HeroPullStore.heroes[heroNumber].props.name}
                </div>
                <div className={"desc"}>
                  {HeroPullStore.heroes[heroNumber].props.description}
                </div>
                <div className={"health"}>
                  {HeroPullStore.heroes[heroNumber].props.health}
                </div>
                <div className={"damage"}>
                  {HeroPullStore.heroes[heroNumber].props.damage}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          id={"section2"}
          className={"landing landing-background"}
          style={{}}
        >
          <div className={"help-header"}>
            СОВЕТЫ И ПОДСКАЗКИ, ЧТОБЫ ПОЛУЧИТЬ <br /> МАКСИМАЛЬНУЮ ОТДАЧУ ОТ
            ИГРОВОГО ПРОЦЕССА
          </div>
          <div className={"help-container blue-card"}>
            <div className={"help-element"}>
              <div className={"nurofen"}>1</div>
              <span>
                Выбирите понравившегося вам персонажа по характеристикам
              </span>
            </div>
            <div className={"help-element"}>
              <div className={"nurofen"}>2</div>
              <span>
                Собираете колоду из 20 карт. Она будет использоваться в
                предстоящем сражении
              </span>
            </div>

            <div className={"help-element"}>
              <div className={"nurofen"}>3</div>
              <span>
                При выходе на игровое поле вам будет выдана случайная карта из
                вашей колоды
              </span>
            </div>
            <div className={"help-element"}>
              <div className={"nurofen"}>4</div>
              <span>
                Карта будет иметь определённое количество урона и здоровья, эти
                параметры будут отображаться в нижней части карты
              </span>
            </div>
            <div className={"help-element"}>
              <div className={"nurofen"}>5</div>
              <span>
                Подумайте, в какой момент вам стоит ставить карту, это может
                повлиять на исход игры
              </span>
            </div>
            <div className={"help-element"}>
              <div className={"nurofen"}>6</div>
              <span>
                Ваша задача сделав правильный выбор с помощью карт не оставить
                игровому противнику здоровья
              </span>
            </div>
          </div>
        </div>
        <div
          id={"section3"}
          className={"landing landing-background"}
          style={{}}
        >
          <div className={"welcome-container"}>
            <span>CARDPIXEL</span>
            <button onClick={toChooseHero}>PLAY</button>
          </div>
        </div>
      </Layout.Container>
    </>
  );
};
