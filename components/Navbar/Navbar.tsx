import styles from "./Navbar.module.scss";
import Image from "next/image";
import Link from "next/link";
import logo from "../../assets/images/logo.png";
import { Burger } from "@mantine/core";
import { useSelector, useDispatch } from "react-redux";
import { toggleNavbar } from "../../context/navbarSlice";
interface NavbarState {
  navbar: {
    isOpen: boolean;
  };
}

const Navbar = () => {
  const dispatch = useDispatch();
  const { isOpen } = useSelector((state: NavbarState) => state.navbar);
  const title = isOpen ? "Close navigation" : "Open navigation";

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <Link href="/">
          <a>
            <Image
              src={logo}
              layout="intrinsic"
              alt="logo"
              objectFit="contain"
            />
          </a>
        </Link>
      </div>
      <div>
        <ul className={styles["nav-links"]}>
          <li className={styles["nav-link"]}>
            <Link href="/home">
              <a>Home</a>
            </Link>
          </li>
          <li className={styles["nav-link"]}>
            <Link href="/">
              <a>Home</a>
            </Link>
          </li>
          <li className={styles["nav-link"]}>
            <Link href="/">
              <a>Home</a>
            </Link>
          </li>
          <li className={styles["nav-link"]}>
            <Link href="/">
              <a>Home</a>
            </Link>
          </li>
        </ul>

        {/* will be shown when the user is not logged in */}

        {/* <div className={styles["nav-actions"]}>
          <button className={styles["sign-up-btn"]}>Sign up</button>

          <button className={styles["login-btn"]}>Log in</button>
        </div> */}

        {/* will be shown when the user is logged in and the screen size is less than 450px */}

        <Burger
          className={styles.hamburger}
          opened={isOpen}
          onClick={() => dispatch(toggleNavbar())}
          title={title}
        />
      </div>
    </nav>
  );
};
export default Navbar;
