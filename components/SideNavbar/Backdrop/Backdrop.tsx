import styles from "./Backdrop.module.scss";
import { toggleNavbar } from "../../../context/navbarSlice";
import { useDispatch } from "react-redux";
const Backdrop = () => {
  const dispatch = useDispatch();
  const sideNavbarCloseHandler = () => {
    dispatch(toggleNavbar());
  };
  return (
    <div onClick={sideNavbarCloseHandler} className={styles.backdrop}></div>
  );
};

export default Backdrop;
