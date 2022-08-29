import styles from "./Navbar.module.scss";
import Image from "next/image";
import Link from "next/link";
import logo from "../../assets/images/logo.png";

const Navbar = () => {
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
        {/* <ul className={styles["nav-links"]}>
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
        </ul> */}
        <div className={styles["nav-actions"]}>
          <button className={styles["sign-up-btn"]}>Sign up</button>

          <button className={styles["login-btn"]}>Log in</button>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
