import styles from "./Footer.module.scss";
import Image from "next/image";
import logo from "../../assets/images/logo.png";
const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles["footer-links-container"]}>
        <ul className={styles["footer-links"]}>
          <li className={styles["footer-link"]}>About</li>
          <li className={styles["footer-link"]}>Terms of Use</li>
          <li className={styles["footer-link"]}>Privacy Policy</li>
        </ul>

        <ul className={styles["footer-links"]}>
          <li className={styles["footer-link"]}>Careers</li>
          <li className={styles["footer-link"]}>Blog</li>
          <li className={styles["footer-link"]}>Contact</li>
          <li className={styles["footer-link"]}>
            <a
              target="_blank"
              rel="noreferrer"
              href="https://github.com/Raj-divine/meethub"
            >
              <strong>Github</strong>
            </a>
          </li>
        </ul>
      </div>

      <div className={styles["image-container"]}>
        <Image src={logo} alt="logo" layout="intrinsic" objectFit="contain" />
      </div>
      <div>
        <p className={styles["copyright-text"]}>
          &#169; Copyright by <strong>Meethub</strong> inc.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
