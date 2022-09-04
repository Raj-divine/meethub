import { useIntersection } from "@mantine/hooks";
import { useEffect, useState } from "react";

type useScrollAnimationConfig = {
  threshold: number;
};

const useScrollAnimation = (config: useScrollAnimationConfig) => {
  const { ref, entry } = useIntersection({
    threshold: config.threshold,
  });
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    if (entry?.isIntersecting && !isIntersecting) {
      setIsIntersecting(true);
    }
  }, [entry?.isIntersecting]);

  return {
    ref,
    entry,
    isIntersecting,
  };
};

export default useScrollAnimation;
