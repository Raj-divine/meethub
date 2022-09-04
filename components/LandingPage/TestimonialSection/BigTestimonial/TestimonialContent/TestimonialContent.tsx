import styles from "./TestimonialContent.module.scss";
import { Blockquote } from "@mantine/core";
type TestimonialContentProps = {
  body: string | undefined;
  title: string | undefined;
};

const TestimonialContent = ({ body, title }: TestimonialContentProps) => {
  return (
    <div>
      <h4 className={styles.title}>{title}</h4>
      <Blockquote
        classNames={{ icon: styles["blockquote-icon"] }}
        className={styles.body}
      >
        {body}
      </Blockquote>
    </div>
  );
};

export default TestimonialContent;
