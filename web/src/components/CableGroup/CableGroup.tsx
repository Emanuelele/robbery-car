import React from "react";
import Cable from "../Cable/Cable";
import styles from "./CableGroup.module.css";

interface CableGroupProps {
  cablesState: any;
  cableConnections: {
    blueCable1: { in: boolean; out: boolean };
    blueCable2: { in: boolean; out: boolean };
    greenCable1: { in: boolean; out: boolean };
    greenCable2: { in: boolean; out: boolean };
    redCable1: { in: boolean; out: boolean };
    redCable2: { in: boolean; out: boolean };
    yellowCable1: { in: boolean; out: boolean };
    yellowCable2: { in: boolean; out: boolean };
  };
  handleCutCable: (cableKey: string) => void;
  handleSelectCutCable: (
    cableKey: keyof CableGroupProps["cableConnections"]
  ) => void;
  isPlierActive: boolean;
  handleConnection: (type: "in" | "out") => void;
}

const CableGroup: React.FC<CableGroupProps> = ({
  cablesState,
  cableConnections,
  handleCutCable,
  handleSelectCutCable,
  isPlierActive,
  handleConnection,
}) => {
  return (
    <>
      {/* Cavi iniziali */}
      <Cable
        id="blueCable"
        className={`${styles.cableLong} ${styles.cableLongBlue}`}
        imageSrc="/src/assets/img/startCable/blueStartCable.png"
        isVisible={!cablesState.blueCable.isCut}
        onClick={() => handleCutCable("blueCable")}
      />

      <Cable
        id="yellowCable"
        className={`${styles.cableLong} ${styles.cableLongYellow}`}
        imageSrc="/src/assets/img/startCable/yellowStartCable.png"
        isVisible={!cablesState.yellowCable.isCut}
        onClick={() => handleCutCable("yellowCable")}
      />
      <Cable
        id="greenCable"
        className={`${styles.cableLong} ${styles.cableLongGreen}`}
        imageSrc="/src/assets/img/startCable/greenStartCable.png"
        isVisible={!cablesState.greenCable.isCut}
        onClick={() => handleCutCable("greenCable")}
      />
      <Cable
        id="redCable"
        className={`${styles.cableLong} ${styles.cableLongRed}`}
        imageSrc="/src/assets/img/startCable/redStartCable.png"
        isVisible={!cablesState.redCable.isCut}
        onClick={() => handleCutCable("redCable")}
      />

      {/* Cavi tagliati e relative immagini IN/OUT */}
      {/* Blue Cable */}
      <Cable
        id="blueCable_cut1"
        className={`${styles.cableCut} ${styles.cableCutBlue1} ${
          isPlierActive ? styles.disabled : ""
        }`}
        imageSrc="/src/assets/img/cutCable/blueCutCable1.png"
        isVisible={
          cablesState.blueCable.isCut &&
          !cableConnections.blueCable1.in &&
          !cableConnections.blueCable1.out
        }
        onClick={() => {
          if (!isPlierActive) handleSelectCutCable("blueCable1");
        }}
      />
      <Cable
        id="blueCable_cut2"
        className={`${styles.cableCut} ${styles.cableCutBlue2} ${
          isPlierActive ? styles.disabled : ""
        }`}
        imageSrc="/src/assets/img/cutCable/blueCutCable2.png"
        isVisible={
          cablesState.blueCable.isCut &&
          !cableConnections.blueCable2.in &&
          !cableConnections.blueCable2.out
        }
        onClick={() => {
          if (!isPlierActive) handleSelectCutCable("blueCable2");
        }}
      />
      <Cable
        id="blueCable_in1"
        className={`${styles.cableIn} ${styles.cableInBlue1}`}
        imageSrc="/src/assets/img/inCable/inBlueCable1.png"
        isVisible={cableConnections.blueCable1.in}
        onClick={() => handleConnection("in")}
      />
      <Cable
        id="blueCable_out1"
        className={`${styles.cableOut} ${styles.cableOutBlue1}`}
        imageSrc="/src/assets/img/outCable/outBlueCable1.png"
        isVisible={cableConnections.blueCable1.out}
        onClick={() => handleConnection("out")}
      />
      <Cable
        id="blueCable_in2"
        className={`${styles.cableIn} ${styles.cableInBlue2}`}
        imageSrc="/src/assets/img/inCable/inBlueCable2.png"
        isVisible={cableConnections.blueCable2.in}
        onClick={() => handleConnection("in")}
      />
      <Cable
        id="blueCable_out2"
        className={`${styles.cableOut} ${styles.cableOutBlue2}`}
        imageSrc="/src/assets/img/outCable/outBlueCable2.png"
        isVisible={cableConnections.blueCable2.out}
        onClick={() => handleConnection("out")}
      />

      {/* Yellow Cable */}
      <Cable
        id="yellowCable_cut1"
        className={`${styles.cableCut} ${styles.cableCutYellow1} ${
          isPlierActive ? styles.disabled : ""
        }`}
        imageSrc="/src/assets/img/cutCable/yellowCutCable1.png"
        isVisible={
          cablesState.yellowCable.isCut &&
          !cableConnections.yellowCable1.in &&
          !cableConnections.yellowCable1.out
        }
        onClick={() => {
          if (!isPlierActive) handleSelectCutCable("yellowCable1");
        }}
      />

      <Cable
        id="yellowCable_cut2"
        className={`${styles.cableCut} ${styles.cableCutYellow2} ${
          isPlierActive ? styles.disabled : ""
        }`}
        imageSrc="/src/assets/img/cutCable/yellowCutCable2.png"
        isVisible={
          cablesState.yellowCable.isCut &&
          !cableConnections.yellowCable2.in &&
          !cableConnections.yellowCable2.out
        }
        onClick={() => {
          if (!isPlierActive) handleSelectCutCable("yellowCable2");
        }}
      />
      <Cable
        id="yellowCable_in1"
        className={`${styles.cableIn} ${styles.cableInYellow1}`}
        imageSrc="/src/assets/img/inCable/inYellowCable1.png"
        isVisible={cableConnections.yellowCable1.in}
        onClick={() => handleConnection("in")}
      />
      <Cable
        id="yellowCable_out1"
        className={`${styles.cableOut} ${styles.cableOutYellow1}`}
        imageSrc="/src/assets/img/outCable/outYellowCable1.png"
        isVisible={cableConnections.yellowCable1.out}
        onClick={() => handleConnection("out")}
      />
      <Cable
        id="yellowCable_in2"
        className={`${styles.cableIn} ${styles.cableInYellow2}`}
        imageSrc="/src/assets/img/inCable/inYellowCable2.png"
        isVisible={cableConnections.yellowCable2.in}
        onClick={() => handleConnection("in")}
      />
      <Cable
        id="yellowCable_out2"
        className={`${styles.cableOut} ${styles.cableOutYellow2}`}
        imageSrc="/src/assets/img/outCable/outYellowCable2.png"
        isVisible={cableConnections.yellowCable2.out}
        onClick={() => handleConnection("out")}
      />

      {/* Green Cable */}
      <Cable
        id="greenCable_cut1"
        className={`${styles.cableCut} ${styles.cableCutGreen1} ${
          isPlierActive ? styles.disabled : ""
        }`}
        imageSrc="/src/assets/img/cutCable/greenCutCable1.png"
        isVisible={
          cablesState.greenCable.isCut &&
          !cableConnections.greenCable1.in &&
          !cableConnections.greenCable1.out
        }
        onClick={() => {
          if (!isPlierActive) handleSelectCutCable("greenCable1");
        }}
      />
      <Cable
        id="greenCable_cut2"
        className={`${styles.cableCut} ${styles.cableCutGreen2} ${
          isPlierActive ? styles.disabled : ""
        }`}
        imageSrc="/src/assets/img/cutCable/greenCutCable2.png"
        isVisible={
          cablesState.greenCable.isCut &&
          !cableConnections.greenCable2.in &&
          !cableConnections.greenCable2.out
        }
        onClick={() => {
          if (!isPlierActive) handleSelectCutCable("greenCable2");
        }}
      />
      <Cable
        id="greenCable_in1"
        className={`${styles.cableIn} ${styles.cableInGreen1}`}
        imageSrc="/src/assets/img/inCable/inGreenCable1.png"
        isVisible={cableConnections.greenCable1.in}
        onClick={() => handleConnection("in")}
      />
      <Cable
        id="greenCable_out1"
        className={`${styles.cableOut} ${styles.cableOutGreen1}`}
        imageSrc="/src/assets/img/outCable/outGreenCable1.png"
        isVisible={cableConnections.greenCable1.out}
        onClick={() => handleConnection("out")}
      />
      <Cable
        id="greenCable_in2"
        className={`${styles.cableIn} ${styles.cableInGreen2}`}
        imageSrc="/src/assets/img/inCable/inGreenCable2.png"
        isVisible={cableConnections.greenCable2.in}
        onClick={() => handleConnection("in")}
      />
      <Cable
        id="greenCable_out2"
        className={`${styles.cableOut} ${styles.cableOutGreen2}`}
        imageSrc="/src/assets/img/outCable/outGreenCable2.png"
        isVisible={cableConnections.greenCable2.out}
        onClick={() => handleConnection("out")}
      />

      {/* Red Cable */}
      <Cable
        id="redCable_cut1"
        className={`${styles.cableCut} ${styles.cableCutRed1} ${
          isPlierActive ? styles.disabled : ""
        }`}
        imageSrc="/src/assets/img/cutCable/redCutCable1.png"
        isVisible={
          cablesState.redCable.isCut &&
          !cableConnections.redCable1.in &&
          !cableConnections.redCable1.out
        }
        onClick={() => {
          if (!isPlierActive) handleSelectCutCable("redCable1");
        }}
      />
      <Cable
        id="redCable_cut2"
        className={`${styles.cableCut} ${styles.cableCutRed2} ${
          isPlierActive ? styles.disabled : ""
        }`}
        imageSrc="/src/assets/img/cutCable/redCutCable2.png"
        isVisible={
          cablesState.redCable.isCut &&
          !cableConnections.redCable2.in &&
          !cableConnections.redCable2.out
        }
        onClick={() => {
          if (!isPlierActive) handleSelectCutCable("redCable2");
        }}
      />
      <Cable
        id="redCable_in1"
        className={`${styles.cableIn} ${styles.cableInRed1}`}
        imageSrc="/src/assets/img/inCable/inRedCable1.png"
        isVisible={cableConnections.redCable1.in}
        onClick={() => handleConnection("in")}
      />
      <Cable
        id="redCable_out1"
        className={`${styles.cableOut} ${styles.cableOutRed1}`}
        imageSrc="/src/assets/img/outCable/outRedCable1.png"
        isVisible={cableConnections.redCable1.out}
        onClick={() => handleConnection("out")}
      />
      <Cable
        id="redCable_in2"
        className={`${styles.cableIn} ${styles.cableInRed2}`}
        imageSrc="/src/assets/img/inCable/inRedCable2.png"
        isVisible={cableConnections.redCable2.in}
        onClick={() => handleConnection("in")}
      />
      <Cable
        id="redCable_out2"
        className={`${styles.cableOut} ${styles.cableOutRed2}`}
        imageSrc="/src/assets/img/outCable/outRedCable2.png"
        isVisible={cableConnections.redCable2.out}
        onClick={() => handleConnection("out")}
      />
    </>
  );
};

export default CableGroup;
