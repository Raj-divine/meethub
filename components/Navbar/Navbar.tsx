import styles from "./Navbar.module.scss";
import Image from "next/image";
import Link from "next/link";
import logo from "../../assets/images/logo.png";
import { useRouter } from "next/router";
import { ReactNode } from "react";

type NavLinkProps = {
  href: string;
  exact?: boolean;
  children: ReactNode;
};

function NavLink({ href, exact, children }: NavLinkProps) {
  const { pathname } = useRouter();
  const isActive = pathname === href;

  return (
    <li className={`${styles["nav-link"]} `}>
      <Link href={href}>
        <a className={isActive ? "active" : ""}>{children}</a>
      </Link>
    </li>
  );
}

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <Link href="/" passHref>
          <Image src={logo} layout="intrinsic" alt="logo" objectFit="contain" />
        </Link>
      </div>
      <div>
        {/* <ul className={styles["nav-links"]}>
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
