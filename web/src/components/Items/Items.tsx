import styles from "./Items.module.css";

interface ItemsProps {
  isPlierActive: boolean;
  isCutting: boolean;
  plierPosition: { x: number; y: number };
  setPlierActive: (active: boolean) => void;
  isDetectorActive: boolean;
  setDetector: () => void;
  handlePlierClick: () => void;
}

const Items: React.FC<ItemsProps> = ({
  isPlierActive,
  isCutting,
  plierPosition,
  setPlierActive,
  isDetectorActive,
  setDetector,
  handlePlierClick,
}) => {
  return (
    <>
      {isPlierActive && (
        <img
          src={
            isCutting
              ? "/src/assets/img/pinza/pinzaChiusa.png"
              : "/src/assets/img/pinza/pinzaAperta.png"
          }
          className={styles.plier}
          style={{
            left: `${plierPosition.x}px`,
            top: `${plierPosition.y}px`,
            position: "fixed",
            pointerEvents: "none",
            transform: "translate(145%, 7%)",
          }}
          alt="Pinza"
        />
      )}

      {!isPlierActive && (
        <div className={styles.plierZone} onClick={handlePlierClick}>
          <img
            src="/src/assets/img/pinza/pinzaAperta.png"
            className={styles.fixedPlier}
            alt="Pinza"
          />
        </div>
      )}

      {isPlierActive && (
        <div className={styles.plierZone} onClick={() => setPlierActive(false)}>
          <p className={styles.plierReturnText}>
            Clicca qui per rimettere la pinza a posto
          </p>
        </div>
      )}

      {!isDetectorActive && (
        <div className={styles.detectorZone}>
          <img
            className={styles.voltageDetectorMini}
            src="src/assets/img/voltageDetectorMini.png"
            alt="Detector Mini"
            onClick={setDetector}
          />
        </div>
      )}

      {isDetectorActive && (
        <img
          className={styles.voltageDetector}
          src="src/assets/img/voltageDetector.png"
          alt="Voltage Detector"
        />
      )}
    </>
  );
};

export default Items;
