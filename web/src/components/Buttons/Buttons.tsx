import React from "react";
import styles from "./Buttons.module.css";
import finalScreen from "../../assets/img/finalScreen.gif";
interface ButtonsProps {
  lightIn: "green" | "red" | null;
  lightOut: "green" | "red" | null;
  handleConnection: (type: "in" | "out") => void;
  finishButton: boolean;
  finishGame: () => void;
}

const Buttons: React.FC<ButtonsProps> = ({
  lightIn,
  lightOut,
  handleConnection,
  finishButton,
  finishGame,
}) => {
  return (
    <>
      <img
        className={styles.inLight}
        src={`/src/assets/img/light/${
          lightIn === "green" ? "greenLight.png" : "redLight.png"
        }`}
        style={{ visibility: lightIn ? "visible" : "hidden" }}
        alt="Luce IN"
      />

      <img
        className={styles.outLight}
        src={`/src/assets/img/light/${
          lightOut === "green" ? "greenLight.png" : "redLight.png"
        }`}
        style={{ visibility: lightOut ? "visible" : "hidden" }}
        alt="Luce OUT"
      />

      <button
        className={styles.inButton}
        onClick={() => {
          console.log("Bottone IN cliccato");
          handleConnection("in");
        }}
      ></button>

      <button
        className={styles.outButton}
        onClick={() => {
          console.log("Bottone OUT cliccato");
          handleConnection("out");
        }}
      ></button>

      {finishButton && (
        <>
          <button onClick={finishGame} className={styles.finishButton}></button>
          <img
            className={styles.finalScreen}
            src={finalScreen}
            alt="Final Screen"
          />
        </>
      )}
    </>
  );
};

export default Buttons;
