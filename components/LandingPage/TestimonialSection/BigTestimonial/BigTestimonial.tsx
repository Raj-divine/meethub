import styles from "./BigTestimonial.module.scss";
import TestimonialAvatar from "./TestimonialAvatar/TestimonialAvatar";
import TestimonialContent from "./TestimonialContent/TestimonialContent";
import { useEffect, useState } from "react";
import avatar4 from "../../../../assets/images/avatar-4.jpg";
import avatar5 from "../../../../assets/images/avatar-5.jpg";
import avatar6 from "../../../../assets/images/avatar-6.jpg";
import { useScrollAnimation } from "../../../../hooks";

const avatarData = [
  {
    avatar: avatar4,
    name: "Raj kushwaha",
    location: "New Delhi, India",
    uid: "JAw1DrSbKz",
  },
  {
    avatar: avatar5,
    name: "Mann Hoff",
    location: "Berlin, Germany",
    uid: "K_0Z7nILmp",
  },
  {
    avatar: avatar6,
    name: "Brad Poole",
    location: "New York, USA",
    uid: "0JHaSnyYXf",
  },
];

const contentData = [
  {
    uid: "JAw1DrSbKz",
    title: "Fastest meetup hosting!",
    body: "I've been using meethub for quite a while now I went to a lot of meetups because I love interacting with different people and I've been thinking about hosting my own meetup so I went to meethub to host a meetup and I was SHOCKED! after seeing how easy it was to host a meetup on this platform thanks @meethub for making this platform.",
  },
  {
    uid: "K_0Z7nILmp",
    title: "Heaven for Techy people",
    body: "As a software engineer I always wanted to meet other developers to increase my knowledge and to grow my career this was not easy after finding out meethub I was super happy because there were a lot of tech meetups on meethub. Meeting other developer outside my company became super easy and simple.",
  },
  {
    uid: "0JHaSnyYXf",
    title: "Taking a break",
    body: "I was exhausted from work and wanted to take a break so my friend told me about meetups and how great they are. So I decided to take a break to go to a meetup and guess what? now I love going to near by meetups which I almost always find on meethub. Taking a break to go to a meetup was a great idea which everyone should try at least once.",
  },
];

type TestimonialDataType = {
  uid: string;
  body: string;
  title: string;
};

const BigTestimonial = () => {
  const [activeButton, setActiveButton] = useState<string>("JAw1DrSbKz");

  const [testimonialData, setTestimonialData] = useState<TestimonialDataType>();

  const { ref: bigTestimonialRef, isIntersecting } = useScrollAnimation({
    threshold: 0.3,
  });

  const onClickHandler = (uid: string) => {
    setActiveButton(uid);
  };

  useEffect(() => {
    const data = contentData.find((data) => data.uid === activeButton);
    setTestimonialData(data);
  }, [activeButton]);

  return (
    <div
      ref={bigTestimonialRef}
      className={`${styles["big-testimonial"]} ${
        isIntersecting ? styles.animate : ""
      }`}
    >
      <div className={styles["avatar-container"]}>
        {avatarData.map((avatar) => {
          return (
            <TestimonialAvatar
              onClickHandler={onClickHandler}
              addClass={activeButton === avatar.uid}
              {...avatar}
              key={avatar.uid}
            />
          );
        })}
      </div>
      <div className={styles["content-container"]}>
        <TestimonialContent
          body={testimonialData?.body}
          title={testimonialData?.title}
        />
      </div>
    </div>
  );
};

export default BigTestimonial;
