import styles from "./BigTestimonial.module.scss";
import TestimonialAvatar from "./TestimonialAvatar/TestimonialAvatar";
import TestimonialContent from "./TestimonialContent/TestimonialContent";
import { useState } from "react";
import avatar4 from "../../../../assets/images/avatar-4.jpg";
import avatar5 from "../../../../assets/images/avatar-5.jpg";
import avatar6 from "../../../../assets/images/avatar-6.jpg";

const avatarData = [
  {
    avatar: avatar4,
    name: "Raj kushwaha",
    location: "San Francisco, USA",
    uid: "JAw1DrSbKz",
  },
  {
    avatar: avatar5,
    name: "Raj kushwaha",
    location: "San Francisco, USA",
    uid: "K_0Z7nILmp",
  },
  {
    avatar: avatar6,
    name: "Raj kushwaha",
    location: "San Francisco, USA",
    uid: "0JHaSnyYXf",
  },
];

const BigTestimonial = () => {
  const [activeButton, setActiveButton] = useState<string>("JAw1DrSbKz");

  const onClickHandler = (uid: string) => {
    setActiveButton(uid);
  };

  return (
    <div className={styles["big-testimonial"]}>
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
        <TestimonialContent />
      </div>
    </div>
  );
};

export default BigTestimonial;
