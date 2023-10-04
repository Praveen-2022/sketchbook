import styles from "./index.module.css";
import cx from "classnames";
export default function Toolbox() {
  return (
    <div className={styles.toolboxContainer}>
        <div className={styles.toolItem}>
          <h4 className={styles.toolText}>Stroke Color</h4>
          <div className={styles.itemContainer}>
            <div
              className={styles.colorBox}
            />
            <div
              className={styles.colorBox}
            />
            <div
              className={styles.colorBox}
            />
            <div
              className={styles.colorBox}
            />
            <div
              className={styles.colorBox}
            />
            <div
              className={styles.colorBox}
            />
          </div>
        </div>
        <div className={styles.toolItem}>
          <h4 className={styles.toolText}>Brush Size</h4>
          <div className={styles.itemContainer}>
            <input
              type="range"
              min={1}
              max={10}
              step={1}
              // onChange={updateBrushSize}
              // value={size}
            />
          </div>
        </div>
    </div>
  );
}
