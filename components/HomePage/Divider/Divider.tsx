import { Button } from "../../Utilities";
import styles from "./Divider.module.scss";
import Link from "next/link";
const Divider = () => {
  return (
    <div className={styles.divider}>
      <div className={styles.content}>
        <p className={styles.heading}>Interested in more meetups?</p>
        <p className={styles.text}>
          We have enough meetups for everyone. Find more!
        </p>
        <Link href="/meetups">
          <a>
            <Button className={styles.button}>View more</Button>
          </a>
        </Link>
      </div>
    </div>
  );
};

export default Divider;
