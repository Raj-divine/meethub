import { SimpleGrid, Text } from "@mantine/core";
import InfoCard from "./InfoCard/InfoCard";
import handshake from "../.././../assets/images/handshake.jpg";
import handWithPen from "../../../assets/images/hand-with-pen.jpg";
import brain from "../../../assets/images/brain.png";
import highFive from "../../../assets/images/high-five.png";

const cardData = [
  {
    image: handshake,
    title: "Meet new people",
    body: "Meeting new like minded people was never easier. No matter what you love you will find people with the same interest on meethub.",
    alt: "handshake",
  },
  {
    image: handWithPen,
    title: "Host a meetup",
    body: "Want to host a meetup yourself? Wait no further with meethub you can host a meetup in just a few steps with a clean and easy UI.",
    alt: "A hand holding a pen",
  },
  {
    image: highFive,
    title: "Make new friends",
    body: "Meetups are a great way to find people with the same interest as you. Meethub helps you find those people and make friends with them ",
    alt: "high five",
  },
  {
    image: brain,
    title: "Learn new things",
    body: "Meeting people can help you learn and grow yourself. Innovative ideas come from the conversations you never had before.",
    alt: "brain",
  },
];

const InfoSection = () => {
  return (
    <section className="section-prefix">
      <Text color="dimmed" component="h3" className="section-heading">
        Why meethub?
      </Text>
      <div>
        <SimpleGrid
          cols={4}
          spacing="lg"
          breakpoints={[
            { maxWidth: 1280, cols: 2, spacing: "xl" },
            { maxWidth: 640, cols: 1, spacing: "xl" },
          ]}
        >
          {cardData.map((data, i) => {
            return <InfoCard key={data.alt + i} {...data} />;
          })}
        </SimpleGrid>
      </div>
    </section>
  );
};

export default InfoSection;
