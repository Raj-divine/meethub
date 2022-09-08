import styles from "./SectionSignUp.module.scss";
import { useScrollAnimation } from "../../../hooks";
import { openModal } from "../../../context/modalSlice";
import { useDispatch } from "react-redux";
const SectionSignUp = () => {
  const { ref: sectionRef, isIntersecting } = useScrollAnimation({
    threshold: 0.2,
  });
  const dispatch = useDispatch();

  const openModalHandler = () => dispatch(openModal({ loggingIn: false }));
  return (
    <section
      ref={sectionRef}
      className={`${styles["section-sign-up"]} ${
        isIntersecting ? styles.animate : ""
      }`}
    >
      <p>Do not waste time thinking</p>
      <p>Create your meethub account today</p>
      <button onClick={openModalHandler}>Join now!</button>
    </section>
  );
};

export default SectionSignUp;
