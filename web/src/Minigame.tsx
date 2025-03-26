import React, { useEffect, useState } from "react";
import styles from "./Minigame.module.css";
import CableGroup from "./components/CableGroup/CableGroup";
import Buttons from "./components/Buttons/Buttons";
import Items from "./components/Items/Items";

import audioGreenLight from "./assets/audio/greenLight.mp3";
import audioItems from "./assets/audio/items.mp3";
import audioCurrent from "./assets/audio/current.mp3";
import audioPlugCable from "./assets/audio/plugCable.mp3";
import audioPlier from "./assets/audio/scissor.mp3";

const initialCableConnections = {
  blueCable1: { in: false, out: false },
  blueCable2: { in: false, out: false },
  greenCable1: { in: false, out: false },
  greenCable2: { in: false, out: false },
  redCable1: { in: false, out: false },
  redCable2: { in: false, out: false },
  yellowCable1: { in: false, out: false },
  yellowCable2: { in: false, out: false },
};

const initialCablesState = {
  blueCable: { isCut: false },
  greenCable: { isCut: false },
  redCable: { isCut: false },
  yellowCable: { isCut: false },
};

const initialCableCutStates = {
  blueCable_cut1: false,
  blueCable_cut2: false,
  greenCable_cut1: false,
  greenCable_cut2: false,
  redCable_cut1: false,
  redCable_cut2: false,
  yellowCable_cut1: false,
  yellowCable_cut2: false,
};

const Minigame: React.FC = () => {
  const [isPlierActive, setPlierActive] = useState(false);
  const [isDetectorActive, setIsDetectorActive] = useState(false);
  const [isCutting, setIsCutting] = useState(false);
  const [plierPosition, setPlierPosition] = useState({ x: 0, y: 0 });
  const [finishButton, setFinishButton] = useState(false);
  const [minigameActive, setMinigameActive] = useState(false);

  const [selectedCable, setSelectedCable] = useState<
    keyof typeof cableConnections | null
  >(null);

  const [lastInConnected, setLastInConnected] = useState<string | null>(null);
  const [lastOutConnected, setLastOutConnected] = useState<string | null>(null);

  const [correctCables, setCorrectCables] = useState<{
    in: string;
    out: string;
  } | null>(null);

  const [lightIn, setLightIn] = useState<"green" | "red" | null>(null);
  const [lightOut, setLightOut] = useState<"green" | "red" | null>(null);

  const [cableConnections, setCableConnections] = useState({
    blueCable1: { in: false, out: false },
    blueCable2: { in: false, out: false },
    greenCable1: { in: false, out: false },
    greenCable2: { in: false, out: false },
    redCable1: { in: false, out: false },
    redCable2: { in: false, out: false },
    yellowCable1: { in: false, out: false },
    yellowCable2: { in: false, out: false },
  });

  const [alarmCable, setAlarmCable] = useState<string | null>(null);
  const [cablesState, setCablesState] = useState({
    blueCable: { isCut: false },
    greenCable: { isCut: false },
    redCable: { isCut: false },
    yellowCable: { isCut: false },
  });

  const [cableCutStates, setCableCutStates] = useState({
    blueCable_cut1: false,
    blueCable_cut2: false,
    greenCable_cut1: false,
    greenCable_cut2: false,
    redCable_cut1: false,
    redCable_cut2: false,
    yellowCable_cut1: false,
    yellowCable_cut2: false,
  });
  // This function wraps the state update for 'minigameActive' and additional initialization logic.
  const handleMinigameActive = (active: boolean) => {
    setMinigameActive(active);
    console.log(minigameActive)
    if (active) {
      // Reset or initialize your game state here
      setCableConnections(initialCableConnections);
      setCablesState(initialCablesState);
      setCableCutStates(initialCableCutStates);
      setSelectedCable(null);
      setLastInConnected(null);
      setLastOutConnected(null);
      setLightIn(null);
      setLightOut(null);
      setFinishButton(false);
      // Initialize correct cables (or any further state) if needed
      const cables = [
        "blueCable1",
        "blueCable2",
        "greenCable1",
        "greenCable2",
        "redCable1",
        "redCable2",
        "yellowCable1",
        "yellowCable2",
      ];
      const filterSameColor = (cable1: string, cable2: string) => {
        const color1 = cable1.replace(/[0-9]/g, "");
        const color2 = cable2.replace(/[0-9]/g, "");
        return color1 !== color2;
      };

      let inCable, outCable;
      do {
        inCable = cables[Math.floor(Math.random() * cables.length)];
        outCable = cables[Math.floor(Math.random() * cables.length)];
      } while (!filterSameColor(inCable, outCable));

      setCorrectCables({ in: inCable, out: outCable });

      // Set alarm cable for demonstration
      const alarmOptions = ["blueCable", "greenCable", "redCable", "yellowCable"];
      const randomAlarm = alarmOptions[Math.floor(Math.random() * alarmOptions.length)];
      setAlarmCable(randomAlarm);
      console.log(`Minigioco attivato. Allarme su: ${randomAlarm}`);
    } else {
      console.log("Minigioco disattivato.");
    }
  };

  // Listen for messages from external (Lua) sources.
  useEffect(() => {
    const messageHandler = (event: MessageEvent) => {
      const data = event.data || {};
      if (data.start) {
        console.log("Messaggio ricevuto: inizio minigioco");
        handleMinigameActive(true);
      }
      if (data.stop) {
        console.log("Messaggio ricevuto: arresto minigioco");
        handleMinigameActive(false);
      }
    };
    
    window.addEventListener("message", messageHandler);
    return () => window.removeEventListener("message", messageHandler);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isPlierActive) {
        setPlierPosition({ x: e.clientX - 320, y: e.clientY - 50 });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [isPlierActive]);

  const handleCutCable = (cableKey: string) => {
    if (!isPlierActive) return;

    let selectedKey: string;

    if (cableKey === "blueCable") {
      selectedKey = cablesState.blueCable.isCut ? "blueCable2" : "blueCable1";
    } else if (cableKey === "greenCable") {
      selectedKey = cablesState.greenCable.isCut
        ? "greenCable2"
        : "greenCable1";
    } else if (cableKey === "redCable") {
      selectedKey = cablesState.redCable.isCut ? "redCable2" : "redCable1";
    } else if (cableKey === "yellowCable") {
      selectedKey = cablesState.yellowCable.isCut
        ? "yellowCable2"
        : "yellowCable1";
    } else return;

    console.log(`Cavo tagliato: ${selectedKey}`);

    const audioCut = new Audio(audioPlier);
    audioCut.volume = 1;
    audioCut.play();

    setCablesState((prevState) => ({
      ...prevState,
      [cableKey]: { isCut: true },
    }));

    if (cableKey === alarmCable) {
      fetch(`https://robbery-car/startalarm`, {
        method: "POST",
      })
    }

    setIsCutting(true);
    setTimeout(() => {
      setIsCutting(false);
    }, 300);
  };

  const handleSelectCutCable = (cableKey: keyof typeof cableConnections) => {
    console.log(`Hai cliccato sul cavo tagliato: ${cableKey}`);
    setSelectedCable(cableKey);
  };

  useEffect(() => {
    const generateCorrectCables = () => {
      const cables = [
        "blueCable1",
        "blueCable2",
        "greenCable1",
        "greenCable2",
        "redCable1",
        "redCable2",
        "yellowCable1",
        "yellowCable2",
      ];

      const filterSameColor = (cable1: string, cable2: string) => {
        const color1 = cable1.replace(/[0-9]/g, "");
        const color2 = cable2.replace(/[0-9]/g, "");
        return color1 !== color2;
      };

      let inCable, outCable;

      do {
        inCable = cables[Math.floor(Math.random() * cables.length)];
        outCable = cables[Math.floor(Math.random() * cables.length)];
      } while (!filterSameColor(inCable, outCable));

      setCorrectCables({ in: inCable, out: outCable });
      console.log(`Cavi corretti: IN - ${inCable}, OUT - ${outCable}`);
    };

    generateCorrectCables();
  }, []);

  const handleConnection = (type: "in" | "out") => {
    const audioP = new Audio(audioPlugCable);
    audioP.volume = 1;
    audioP.play();
    if (!selectedCable) {
      if (type === "in" && lastInConnected) {
        console.log(`Scollego ${lastInConnected} da IN`);
        setCableConnections((prevState) => ({
          ...prevState,
          [lastInConnected as keyof typeof prevState]: {
            ...prevState[lastInConnected as keyof typeof prevState],
            in: false,
          },
        }));
        setCablesState((prevState) => ({
          ...prevState,
          [lastInConnected as keyof typeof prevState]: {
            ...prevState[lastInConnected as keyof typeof prevState],
            isVisible: true,
          },
        }));
        setLightIn(null);
        setLastInConnected(null);
      } else if (type === "out" && lastOutConnected) {
        console.log(`Scollego ${lastOutConnected} da OUT`);
        setCableConnections((prevState) => ({
          ...prevState,
          [lastOutConnected as keyof typeof prevState]: {
            ...prevState[lastOutConnected as keyof typeof prevState],
            out: false,
          },
        }));
        setCablesState((prevState) => ({
          ...prevState,
          [lastOutConnected as keyof typeof prevState]: {
            ...prevState[lastOutConnected as keyof typeof prevState],
            isVisible: true,
          },
        }));
        setLightOut(null);
        setLastOutConnected(null);
      } else {
        console.error("Nessun cavo selezionato");
      }

      return;
    }

    if (
      type === "in" &&
      cableConnections[selectedCable as keyof typeof cableConnections].out
    ) {
      console.error(
        `Il cavo ${selectedCable} è già collegato a OUT e non può essere collegato anche a IN`
      );
      return;
    }

    if (
      type === "out" &&
      cableConnections[selectedCable as keyof typeof cableConnections].in
    ) {
      console.error(
        `Il cavo ${selectedCable} è già collegato a IN e non può essere collegato anche a OUT`
      );
      return;
    }

    console.log(`Bottone ${type.toUpperCase()} cliccato`);

    setCableConnections((prevState) => {
      const currentConnectionState =
        prevState[selectedCable as keyof typeof prevState][type];

      if (!currentConnectionState) {
        if (type === "in" && lastInConnected) {
          prevState[lastInConnected as keyof typeof prevState].in = false;
          setCablesState((prevState) => ({
            ...prevState,
            [lastInConnected as keyof typeof prevState]: {
              ...prevState[lastInConnected as keyof typeof prevState],
              isVisible: true,
            },
          }));
          console.log(`Scollego ${lastInConnected} da IN`);
        }
        if (type === "out" && lastOutConnected) {
          prevState[lastOutConnected as keyof typeof prevState].out = false;
          setCablesState((prevState) => ({
            ...prevState,
            [lastOutConnected as keyof typeof prevState]: {
              ...prevState[lastOutConnected as keyof typeof prevState],
              isVisible: true,
            },
          }));
          console.log(`Scollego ${lastOutConnected} da OUT`);
        }

        if (type === "in") setLastInConnected(selectedCable);
        if (type === "out") setLastOutConnected(selectedCable);
      }

      const updatedState = {
        ...prevState,
        [selectedCable as keyof typeof prevState]: {
          ...prevState[selectedCable as keyof typeof prevState],
          [type]: !currentConnectionState,
        },
      };

      setCablesState((prevState) => ({
        ...prevState,
        [selectedCable as keyof typeof prevState]: {
          ...prevState[selectedCable as keyof typeof prevState],
          isCut:
            !updatedState[selectedCable as keyof typeof updatedState][type],
          isVisible:
            !updatedState[selectedCable as keyof typeof updatedState][type],
        },
      }));

      return updatedState;
    });

    if (correctCables) {
      if (type === "in") {
        if (selectedCable === correctCables.in) {
          console.log("Luce IN verde");
          setLightIn("green");
        } else {
          console.log("Luce IN rossa");
          setLightIn("red");
        }
      } else if (type === "out") {
        if (selectedCable === correctCables.out) {
          console.log("Luce OUT verde");
          setLightOut("green");
        } else {
          console.log("Luce OUT rossa");
          setLightOut("red");
        }
      }
    }

    setSelectedCable(null);
  };

  useEffect(() => {
    if (lightIn === "green" && lightOut === "green") {
      setFinishButton(true);

      const audioC = new Audio(audioCurrent);
      audioC.volume = 1;
      audioC.play();
    }
  }, [lightIn, lightOut]);

  useEffect(() => {
    if (lightIn === "green") {
      const audioG = new Audio(audioGreenLight);
      audioG.volume = 1;
      audioG.play();
    }
  }, [lightIn]);

  useEffect(() => {
    if (lightOut === "green") {
      const audioG = new Audio(audioGreenLight);
      audioG.volume = 1;
      audioG.play();
    }
  }, [lightOut]);

  useEffect(() => {
    const checkCableConnection = () => {
      Object.keys(cableCutStates).forEach((cable) => {
        const cableKey = cable.replace(
          "_cut",
          ""
        ) as keyof typeof cableConnections;

        if (cableConnections[cableKey].in || cableConnections[cableKey].out) {
          setCableCutStates((prevState) => ({
            ...prevState,
            [cable]: false,
          }));
        }
      });
    };

    checkCableConnection();
  }, [cableConnections]);

  const setDetector = () => {
    setIsDetectorActive(true);

    const audioI = new Audio(audioItems);
    audioI.volume = 1;
    audioI.play();
  };

  const finishGame = () => {
    setTimeout(() => {
      fetch(`https://robbery-car/completed`, {
        method: "POST",
      })
    }, 500);
  };

  const handlePlierClick = () => {
    setPlierActive(true);

    const audioI = new Audio(audioItems);
    audioI.volume = 1;
    audioI.play();
  };

  return (
    <>
      <div className={styles.container}>
        <Items
          isPlierActive={isPlierActive}
          isCutting={isCutting}
          plierPosition={plierPosition}
          setPlierActive={setPlierActive}
          isDetectorActive={isDetectorActive}
          setDetector={setDetector}
          handlePlierClick={handlePlierClick}
        />

        <Buttons
          lightIn={lightIn}
          lightOut={lightOut}
          handleConnection={handleConnection}
          finishButton={finishButton}
          finishGame={finishGame}
        />

        <CableGroup
          cablesState={cablesState}
          cableConnections={cableConnections}
          handleCutCable={handleCutCable}
          handleSelectCutCable={handleSelectCutCable}
          isPlierActive={isPlierActive}
          handleConnection={handleConnection}
        />
      </div>
    </>
  );
};

export default Minigame;
