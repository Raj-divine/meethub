import styles from "./HeroSection.module.scss";
import { Button } from "../../Utilities";
import { useDispatch } from "react-redux";
import { openModal } from "../../../context/modalSlice";
const HeroSection = () => {
  const dispatch = useDispatch();

  return (
    <header className={styles.header}>
      <div className={styles["heading-container"]}>
        <h1 className={styles["primary-heading"]}>
          Outside is where innovation happens
        </h1>
        <h2 className={styles["secondary-heading"]}>
          Explore the world and meet new people
        </h2>
        <Button
          onClick={() => dispatch(openModal({ loggingIn: false }))}
          className={styles["btn-primary"]}
        >
          Get Started
        </Button>
      </div>
    </header>
  );
};

export default HeroSection;
