import styles from "./HeroSection.module.scss";
import { Button } from "../../Utilities";
const HeroSection = () => {
  return (
    <header className={styles.header}>
      <div className={styles["heading-container"]}>
        <h1 className={styles["primary-heading"]}>
          Outside is where innovation happens
        </h1>
        <h2 className={styles["secondary-heading"]}>
          Explore the world and meet new people
        </h2>
        <Button className={styles["btn-primary"]}>Get Started</Button>
      </div>
    </header>
  );
};

export default HeroSection;
