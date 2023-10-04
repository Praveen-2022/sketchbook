import { useSelector,useDispatch } from "react-redux";
import styles from "./index.module.css";
import cx from "classnames";
import { COLORS, MENU_ITEMS } from "@/constants";

export default function Toolbox() {
  const activeMenuItem = useSelector((state) => state.menu.activeMenuItem);
  
  const showStrokeToolOption = activeMenuItem === MENU_ITEMS.PENCIL
  const showBrushToolOption =activeMenuItem === MENU_ITEMS.PENCIL || activeMenuItem === MENU_ITEMS.ERASER;
  
  const updateBrushSize =(e)=>{

  }

  return (
    <div className={styles.toolboxContainer}>
      {showStrokeToolOption && (
        <div className={styles.toolItem}>
          <h4 className={styles.toolText}>Stroke Color</h4>
          <div className={styles.itemContainer}>
            <div
              className={styles.colorBox}
              style={{ backgroundColor: COLORS.BLACK }}
            />
            <div className={styles.colorBox} />
            <div className={styles.colorBox} />
            <div className={styles.colorBox} />
            <div className={styles.colorBox} />
            <div className={styles.colorBox} />
          </div>
        </div>
      )}
      {showBrushToolOption && (
        <div className={styles.toolItem}>
          <h4 className={styles.toolText}>Brush Size{activeMenuItem}</h4>
          <div className={styles.itemContainer}>
            <input
              type="range"
              min={1}
              max={10}
              step={1}
              onChange={updateBrushSize}
              // value={size}
            />
          </div>
        </div>
      )}
    </div>
  );
}
