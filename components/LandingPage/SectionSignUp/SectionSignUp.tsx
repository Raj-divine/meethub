import styles from "./SectionSignUp.module.scss";
import { useScrollAnimation } from "../../../hooks";
const SectionSignUp = () => {
  const { ref: sectionRef, isIntersecting } = useScrollAnimation({
    threshold: 0.2,
  });
  return (
    <section
      ref={sectionRef}
      className={`${styles["section-sign-up"]} ${
        isIntersecting ? styles.animate : ""
      }`}
    >
      <p>Do not waste time thinking</p>
      <p>Create your meethub account today</p>
      <button>Join now!</button>
    </section>
  );
};

export default SectionSignUp;
