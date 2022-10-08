import { Text, SimpleGrid, Space, Divider } from "@mantine/core";
import { DocumentData } from "firebase/firestore";
import { useRouter } from "next/router";
import MeetupCard from "../../MeetupCard/MeetupCard";
import { Button } from "../../Utilities";
import styles from "./MeetupsContainer.module.scss";

interface MeetupsContainerProps {
  meetups: DocumentData[];
  getNextMeetups: () => void;
}

const MeetupsContainer = ({
  meetups,
  getNextMeetups,
}: MeetupsContainerProps) => {
  const router = useRouter();
  const { filter, category } = router.query;
  let text = "";
  if (filter && !category) {
    text = filter.toString();
  } else if (category && !filter) {
    text = `related to ${category}`;
  } else if (category && filter) {
    text = `${filter} and related to ${category}`;
  } else {
    text = "recommended by meethub";
  }
  return (
    <>
      <div className={styles["meetups-container"]}>
        <div className={styles["heading-container"]}>
          <h3 className={styles.heading}>All meetups that are</h3>
          <Text className={styles.text}>{text}</Text>
        </div>
        <div className={styles["all-meetups"]}>
          <SimpleGrid
            breakpoints={[
              { maxWidth: 1100, cols: 2 },
              { maxWidth: 768, cols: 1 },
            ]}
            cols={3}
            spacing="lg"
          >
            {meetups.map((meetup) => {
              return <MeetupCard meetup={meetup} key={meetup.uid} />;
            })}
          </SimpleGrid>
        </div>
        {meetups.length % 25 === 0 && (
          <div className={styles["button-container"]}>
            <Button onClick={getNextMeetups}>Load more Meetups</Button>
          </div>
        )}
        <div className={styles["divider-container"]}>
          {meetups.length % 25 !== 0 && (
            <Divider
              classNames={{
                label: styles["divider-label"],
              }}
              label="No more meetups"
              labelPosition="center"
            />
          )}
        </div>
      </div>

      <Space h="xl" />
    </>
  );
};

export default MeetupsContainer;
