import styles from "./Header.module.scss";

import { Divider } from "@mantine/core";
const Header = () => {
  return (
    <>
      <header className={styles.header}>
        <div className={styles.container}>
          <div className={styles["header-content"]}>
            <h2>Find something amazing today!</h2>
          </div>
          <div className={styles["header-image"]}>&nbsp;</div>
        </div>
      </header>
      <Divider />
    </>
  );
};
export default Header;
