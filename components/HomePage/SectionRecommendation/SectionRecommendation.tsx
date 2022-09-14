import styles from "./SectionRecommendation.module.scss";
import { SimpleGrid } from "@mantine/core";
import FeaturedMeetup from "./FeaturedMeetup/FeaturedMeetups";
const SectionRecommendation = () => {
  return (
    <section className={styles["section-recommendation"]}>
      <h2 className={styles.heading}>Recommended by Meethub for you</h2>
      <div className={styles["meetup-container"]}>
        <SimpleGrid spacing="xl" cols={3}>
          <FeaturedMeetup />
          <FeaturedMeetup />
          <FeaturedMeetup />
          <FeaturedMeetup />
          <FeaturedMeetup />
          <FeaturedMeetup />
        </SimpleGrid>
      </div>
    </section>
  );
};

export default SectionRecommendation;
