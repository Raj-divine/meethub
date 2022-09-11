import styles from "./SideNavbar.module.scss";
import Link from "next/link";
import logo from "../../assets/images/logo.png";
import Image from "next/image";
import { Burger } from "@mantine/core";
import { useSelector, useDispatch } from "react-redux";
import { toggleNavbar } from "../../context/navbarSlice";
import { useEffect } from "react";
import Backdrop from "./Backdrop/Backdrop";
import { getAuth, signOut } from "firebase/auth";
import { useRouter } from "next/router";
interface NavbarState {
  navbar: {
    isOpen: boolean;
  };
}
const SideNavbar = () => {
  const { isOpen } = useSelector((state: NavbarState) => state.navbar);
  const router = useRouter();
  const dispatch = useDispatch();
  const title = isOpen ? "Close navigation" : "Open navigation";
  const auth = getAuth();
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      dispatch(toggleNavbar());
    }
  }, [router.pathname]);

  const signOutHandler = async () => {
    await signOut(auth);
    router.replace("/");
  };

  return (
    <>
      <nav
        className={`${styles["side-nav"]} ${
          isOpen ? styles["animate-side-nav"] : ""
        }`}
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
            <li>
              <button
                onClick={signOutHandler}
                className={styles["sign-out-btn"]}
              >
                Sign Out
              </button>
            </li>
          </ul>
        </div>
      </nav>
      {/* Backdrop */}

      {isOpen && <Backdrop />}
    </>
  );
};

export default SideNavbar;
