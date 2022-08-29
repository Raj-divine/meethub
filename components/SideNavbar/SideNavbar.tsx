import styles from "./SideNavbar.module.scss";
import Link from "next/link";
import logo from "../../assets/images/logo.png";
import Image from "next/image";
import { Burger } from "@mantine/core";
import { useSelector, useDispatch } from "react-redux";
import { toggleNavbar } from "../../context/navbarSlice";
interface NavbarState {
  navbar: {
    isOpen: boolean;
  };
}
const SideNavbar = () => {
  const { isOpen } = useSelector((state: NavbarState) => state.navbar);
  const dispatch = useDispatch();
  const title = isOpen ? "Close navigation" : "Open navigation";

  document.body.style.overflow = isOpen ? "hidden" : "auto";

  return (
    <nav
      className={styles["side-nav"]}
      style={isOpen ? { transform: "translateX(0)" } : {}}
    >
      <div className={styles["nav-head"]}>
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
          <Burger
            opened={isOpen}
            onClick={() => dispatch(toggleNavbar())}
            title={title}
          />
        </div>
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
      </div>
    </nav>
  );
};

export default SideNavbar;
