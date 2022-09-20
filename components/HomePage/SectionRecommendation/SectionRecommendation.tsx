import styles from "./SectionRecommendation.module.scss";
import { SimpleGrid } from "@mantine/core";
import FeaturedMeetup from "./FeaturedMeetup/FeaturedMeetup";
import { meetups } from "../../../fakeData";
const SectionRecommendation = () => {
  return (
    <section className={styles["section-recommendation"]}>
      <h2 className={styles.heading}>Recommended by Meethub for you</h2>
      <div className={styles["meetup-container"]}>
        <SimpleGrid
          breakpoints={[
            { maxWidth: 1280, cols: 2 },
            { maxWidth: 640, cols: 1 },
          ]}
          spacing="sm"
          cols={3}
        >
          {meetups.map((meetup) => {
            return (
              <FeaturedMeetup
                title={meetup.title}
                date={meetup.date}
                price={meetup.price}
                image={meetup.image}
                key={meetup.title}
              />
            );
          })}
        </SimpleGrid>
      </div>
    </section>
  );
};

export default SectionRecommendation;
