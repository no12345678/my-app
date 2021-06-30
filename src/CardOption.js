import React from "react";
import styles from "./CardOption.module.css";

function CardOption(props) {
  return (
    <div className={styles.container}>
      {props.imageCard ? (
        <>
          <div
            className={`${styles.optionContainer}  ${styles.imageContainer}`}
            style={{
              backgroundImage: `url(${props.relativeImagePath})`,
              backgroundSize: props.backgroundSize,
            }}
          ></div>
          <div className={styles.optionTitle}>{props.title}</div>
        </>
      ) : (
        <div className={`${styles.optionContainer} ${styles.textCardOption}`}>{props.optionText}</div>
      )}
    </div>
  );
}

export default CardOption;
