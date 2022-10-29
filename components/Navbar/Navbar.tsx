import styles from "./Navbar.module.scss";
import Image from "next/image";
import Link from "next/link";
import logo from "../../assets/images/logo.png";
import { Burger, Center } from "@mantine/core";
import { useSelector, useDispatch } from "react-redux";
import { toggleNavbar } from "../../context/navbarSlice";
import { openModal } from "../../context/modalSlice";
import { Button } from "../Utilities";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useUser } from "../../hooks";
import { AiFillCaretDown } from "react-icons/ai";
import { getUser } from "../../utils";
interface NavbarState {
  navbar: {
    isOpen: boolean;
  };
}

const Navbar = () => {
  const [userData, setUserData] = useState<any>();
  const router = useRouter();
  const dispatch = useDispatch();
  const { isOpen } = useSelector((state: NavbarState) => state.navbar);
  const title = isOpen ? "Close navigation" : "Open navigation";
  const [addClass, setAddClass] = useState(false);
  const { user, loading } = useUser();
  useEffect(() => {
    const checkPosition = () => {
      if (window.scrollY > 60) setAddClass(true);
      else setAddClass(false);
    };

    const getUserData = async () => {
      const data = await getUser();
      setUserData(data);
    };

    getUserData();

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
        <Link href={!user && !loading ? "/" : "/home"}>
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

        {user && !loading && (
          <ul className={styles["nav-links"]}>
            <li className={styles["nav-link"]}>
              <Link href="/home">
                <a>Home</a>
              </Link>
            </li>

            <li className={styles.dropdown}>
              <Center>
                Meetups <AiFillCaretDown />
              </Center>
              <ul className={styles["dropdown-list"]}>
                <li className={styles["dropdown-item"]}>
                  <Link href="/meetups">
                    <a>All meetups</a>
                  </Link>
                </li>
                <li className={styles["dropdown-item"]}>
                  <Link href="/meetups/host">
                    <a>Host meetup</a>
                  </Link>
                </li>
                <li className={styles["dropdown-item"]}>
                  <Link href="/meetups/bookmarks">
                    <a>Bookmarks</a>
                  </Link>
                </li>
              </ul>
            </li>
            <li className={styles["nav-link"]}>
              <Link href="/">
                <a>Home</a>
              </Link>
            </li>
            <li className={styles["profile-picture"]}>
              <Image
                src={userData?.profilePicture}
                objectFit="contain"
                layout="fill"
              />
            </li>
          </ul>
        )}

        {/* will be shown when the user is not logged in */}

        {!user && !loading && (
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
        {user && !loading && (
          <div className={styles["ham-profile"]}>
            <div className={styles["profile-picture"]}>
              <Image
                src={userData?.profilePicture}
                objectFit="contain"
                layout="fill"
              />
            </div>
            <Burger
              className={styles.hamburger}
              opened={isOpen}
              onClick={() => dispatch(toggleNavbar())}
              title={title}
            />
          </div>
        )}
      </div>
    </nav>
  );
};
export default Navbar;
