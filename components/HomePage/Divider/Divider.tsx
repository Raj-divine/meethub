import { Button } from "../../Utilities";
import styles from "./Divider.module.scss";

const Divider = () => {
  return (
    <div className={styles.divider}>
      <div className={styles.content}>
        <p className={styles.heading}>Interested in more meetups?</p>
        <p className={styles.text}>
          We have enough meetups for everyone. Find more!
        </p>
        <Button className={styles.button}>View more</Button>
      </div>
    </div>
  );
};

export default Divider;
