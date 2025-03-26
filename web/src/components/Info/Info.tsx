import styles from "./Info.module.css";

const Info = () => {
  return (
    <>
      <div className={styles.containerInfo}>
        <p className={styles.p1}>Usa la Pinza per tagliare i cavi</p>
        <p className={styles.p2}>
          Trova il segnale giusto con il Voltage Detector
        </p>
      </div>
    </>
  );
};

export default Info;
