import styles from "./Testimonial.module.scss";
import { Text, Blockquote } from "@mantine/core";
import Image, { StaticImageData } from "next/image";
import avatar1 from "../../../../assets/images/avatar-1.jpg";

type TestimonialProps = {
  title: string;
  body: string;
  avatar: StaticImageData;
  name: string;
  location: string;
};

const Testimonial = ({
  title,
  body,
  avatar,
  name,
  location,
}: TestimonialProps) => {
  return (
    <div className={styles.slide}>
      <h4>{title}</h4>
      <Blockquote className={styles.body}>{body}</Blockquote>
      <div className={styles.footer}>
        <div className={styles["avatar-container"]}>
          <div className={styles.avatar}>
            <Image
              src={avatar}
              layout="intrinsic"
              alt={name}
              objectFit="contain"
            />
          </div>
        </div>
        <div>
          <Text className={styles.name}>{name}</Text>
          <Text className={styles.location} color="dimmed">
            {location}
          </Text>
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
