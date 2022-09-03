import styles from "./TestimonialSection.module.scss";
import { Text, Center } from "@mantine/core";
import { Carousel } from "@mantine/carousel";
import Testimonial from "./Testimonial/Testimonial";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import avatar1 from "../../../assets/images/avatar-1.jpg";
import avatar2 from "../../../assets/images/avatar-2.jpg";
import avatar3 from "../../../assets/images/avatar-3.jpg";
import { useIntersection } from "@mantine/hooks";
import { useEffect, useState } from "react";

const testimonialData = [
  {
    title: "Best place to find meetups",
    body: "Meethub is by far the best place to find meetups near me. It is super easy to use has a very minimal user interface and checks all the boxes for me. I can't stop recommending it to others since it is such a nice platform thankyou all the folks at meethub for making this platform.",
    name: "Ann S. Kinchen",
    location: "San Francisco, USA",
    avatar: avatar1,
  },
  {
    title: "Talk about innovation!",
    body: "I once went to a meetup that was about tech related stuff which I found on meethub and I met a lot of intelligent and amazing people there, I also met a person who was trying to start his own tech startup and after talking to him I joined the company as a co-founder and now our company is now solving peoples health problems using tech this was all possible because of meethub",
    name: "Johnathan Holmes",
    location: "Sydney, Australia",
    avatar: avatar2,
  },
  {
    title: "Interacting made easy",
    body: "I live alone in a big city. Since I left my home town it was hard for me to find people to interact to and that's how I found out about meethub when I saw how easy it was to host/join a meetup I immediately fel in love with meethub it was the best thing I found on the internet ",
    name: "Fuji Tanaka",
    location: "Tokyo, Japan",
    avatar: avatar3,
  },
];

const TestimonialSection = () => {
  const { ref: testimonialRef, entry } = useIntersection({
    threshold: 0.2,
  });
  const [isIntersecting, setIsIntersecting] = useState(false);
  useEffect(() => {
    if (entry?.isIntersecting && !isIntersecting) {
      setIsIntersecting(true);
    }
  }, [entry?.isIntersecting]);

  return (
    <section className="section-prefix">
      <Text color="dimmed" component="h3" className="section-heading">
        Some happy users
      </Text>
      <Center>
        <div
          ref={testimonialRef}
          className={`${styles["carousel-container"]} ${
            isIntersecting ? styles.animate : ""
          }`}
        >
          <Carousel
            controlSize={40}
            nextControlIcon={<AiOutlineArrowRight size={16} />}
            previousControlIcon={<AiOutlineArrowLeft size={16} />}
            slideSize="100%"
            loop
          >
            {testimonialData.map((data, i) => {
              return (
                <Carousel.Slide key={data.name + i}>
                  <Testimonial {...data} />
                </Carousel.Slide>
              );
            })}
          </Carousel>
        </div>
      </Center>
    </section>
  );
};

export default TestimonialSection;
