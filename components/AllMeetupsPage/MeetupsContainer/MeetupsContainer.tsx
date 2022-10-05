import { Text, SimpleGrid } from "@mantine/core";
import { DocumentData } from "firebase/firestore";
import { useRouter } from "next/router";
import styles from "./MeetupsContainer.module.scss";

const MeetupsContainer = ({ meetups }: DocumentData) => {
  const router = useRouter();
  let text = "";
  if (router.query.filter) {
    text = router.query.filter.toString();
  } else if (router.query.category) {
    text = `related to ${router.query.category}`;
  } else if (router.query.category && router.query.filter) {
    text = `${router.query.filter} and related to ${router.query.category}`;
  } else {
    text = "recommended by meethub";
  }
  return (
    <div className={styles["meetups-container"]}>
      <div className={styles["heading-container"]}>
        <h3 className={styles.heading}>All meetups that are</h3>
        <Text className={styles.text}>{text}</Text>
      </div>
      <div className={styles["all-meetups"]}>
        <SimpleGrid cols={3}>
          <div>1</div>
          <div>2</div>
          <div>3</div>
          <div>4</div>
          <div>5</div>
        </SimpleGrid>
      </div>
    </div>
  );
};

export default MeetupsContainer;
