import styles from "./SectionMeetup.module.scss";
import { SimpleGrid } from "@mantine/core";
import MeetupCard from "../../MeetupCard/MeetupCard";

type SectionMeetupProps = {
  heading: string;
  meetups: {
    title: string;
    description: string;
    date: string;
    price: number;
    location: string;
    category: string;
    image: string;
    host: {
      uid: string;
      fullName: string;
      profilePicture: string;
    };
  }[];
};

const SectionMeetup = ({ heading, meetups }: SectionMeetupProps) => {
  return (
    <section className={styles["section-meetup"]}>
      <h2 className={styles.heading}>{heading}</h2>
      <div>
        <SimpleGrid cols={4}>
          {meetups.slice(0, 4).map((meetup) => {
            return <MeetupCard key={meetup.title} meetup={meetup} />;
          })}
        </SimpleGrid>
      </div>
    </section>
  );
};

export default SectionMeetup;
