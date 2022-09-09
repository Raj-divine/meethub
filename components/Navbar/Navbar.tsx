import styles from "./Navbar.module.scss";
import Image from "next/image";
import Link from "next/link";
import logo from "../../assets/images/logo.png";
import { Burger } from "@mantine/core";
import { useSelector, useDispatch } from "react-redux";
import { toggleNavbar } from "../../context/navbarSlice";
import { openModal } from "../../context/modalSlice";
import { Button } from "../Utilities";
import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import { useRouter } from "next/router";
interface NavbarState {
  navbar: {
    isOpen: boolean;
  };
}

const Navbar = () => {
  const router = useRouter();

  const auth = getAuth();
  const dispatch = useDispatch();
  const { isOpen } = useSelector((state: NavbarState) => state.navbar);
  const title = isOpen ? "Close navigation" : "Open navigation";
  const [addClass, setAddClass] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isUserLoaded, setIsUserLoaded] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setIsUserLoaded(false);
      if (user) {
        setCurrentUser(user);
      }
      setIsUserLoaded(true);
    });
  }, []);

  useEffect(() => {
    const checkPosition = () => {
      if (window.scrollY > 60) setAddClass(true);
      else setAddClass(false);
    };

    document.addEventListener("scroll", checkPosition);
  }, []);

  const openModalHandler = (loggingIn: boolean) => {
    dispatch(openModal({ loggingIn }));
  };

  return (
    <nav
      className={`${styles.navbar} ${
        addClass || router.pathname !== "/" ? styles["add-background"] : ""
      }`}
    >
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
        {/* will be shown when the user is logged in and the screen size is greater than 450px */}

        {currentUser && isUserLoaded && (
          <ul className={styles["nav-links"]}>
            <li
              className={`${styles["nav-link"]} ${
                addClass || router.pathname !== "/" ? styles["black-link"] : ""
              }`}
            >
              <Link href="/home">
                <a>Home</a>
              </Link>
            </li>
            <li
              className={`${styles["nav-link"]} ${
                addClass || router.pathname !== "/" ? styles["black-link"] : ""
              }`}
            >
              <Link href="/">
                <a>Home</a>
              </Link>
            </li>
            <li
              className={`${styles["nav-link"]} ${
                addClass || router.pathname !== "/" ? styles["black-link"] : ""
              }`}
            >
              <Link href="/">
                <a>Home</a>
              </Link>
            </li>
            <li
              className={`${styles["nav-link"]} ${
                addClass || router.pathname !== "/" ? styles["black-link"] : ""
              }`}
            >
              <Link href="/">
                <a>Home</a>
              </Link>
            </li>
          </ul>
        )}

        {/* will be shown when the user is not logged in */}

        {!currentUser && isUserLoaded && (
          <div className={styles["nav-actions"]}>
            <Button onClick={openModalHandler.bind(this, false)}>
              Sign up
            </Button>

            <button
              onClick={openModalHandler.bind(this, true)}
              className={`${styles["login-btn"]} ${
                addClass || router.pathname !== "/" ? styles["color-black"] : ""
              }`}
            >
              Log in
            </button>
          </div>
        )}

        {/* will be shown when the user is logged in and the screen size is less than 450px */}
        {currentUser && isUserLoaded && (
          <Burger
            className={styles.hamburger}
            opened={isOpen}
            onClick={() => dispatch(toggleNavbar())}
            title={title}
          />
        )}
      </div>
    </nav>
  );
};
export default Navbar;
