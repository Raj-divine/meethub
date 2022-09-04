import styles from "./TestimonialAvatar.module.scss";
import { Text } from "@mantine/core";
import Image, { StaticImageData } from "next/image";
import { MouseEventHandler, useRef } from "react";

type TestimonialAvatarProps = {
  uid: string;
  avatar: StaticImageData;
  name: string;
  location: string;
  onClickHandler: (uid: string) => void;
  addClass: boolean;
};

const TestimonialAvatar = (props: TestimonialAvatarProps) => {
  const { uid, avatar, name, location, onClickHandler, addClass } = props;
  const avatarRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={avatarRef}
      data-uid={uid}
      onClick={() => onClickHandler(uid)}
      className={`${styles.avatar} ${addClass ? styles.active : ""}`}
    >
      <div className={styles["image-container"]}>
        <Image src={avatar} layout="intrinsic" objectFit="contain" alt={name} />
      </div>
      <div>
        <Text className={styles.name}>{name}</Text>
        <Text className={styles.location} color="dimmed">
          {location}
        </Text>
      </div>
    </div>
  );
};

export default TestimonialAvatar;
