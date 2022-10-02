import styles from "./SectionMeetup.module.scss";
import { SimpleGrid, ScrollArea } from "@mantine/core";
import MeetupCard from "../../MeetupCard/MeetupCard";
import { useScrollAnimation } from "../../../hooks";
import { DocumentData } from "firebase/firestore";

type SectionMeetupProps = {
  heading: string;
  last?: boolean;
  meetups: DocumentData[];
};

const SectionMeetup = ({ heading, meetups, last }: SectionMeetupProps) => {
  const { ref: sectionRef, isIntersecting } = useScrollAnimation({
    threshold: 0.2,
  });

  return (
    <section
      style={last ? { paddingBottom: "50px" } : {}}
      ref={sectionRef}
      className={`${styles["section-meetup"]} ${
        isIntersecting ? styles.animate : ""
      }`}
    >
      <h2 className={styles.heading}>{heading}</h2>
      <ScrollArea className={styles.content}>
        <SimpleGrid
          breakpoints={[
            { maxWidth: 1280, cols: 3 },
            { maxWidth: 1000, cols: 2 },
            { maxWidth: 640, cols: 1 },
          ]}
          cols={4}
        >
          {meetups.slice(0, 4).map((meetup) => {
            return <MeetupCard key={meetup.title} meetup={meetup} />;
          })}
        </SimpleGrid>
      </ScrollArea>
    </section>
  );
};

export default SectionMeetup;
