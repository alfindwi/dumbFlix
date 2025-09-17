import { Img } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
  w?: string | number;
  h?: string | number;
  borderRadius?: string;
}

export const LazyImage: React.FC<LazyImageProps> = ({
  src,
  alt,
  className,
  style,
  w,
  h,
  borderRadius,
}) => {
  const imgRef = useRef<HTMLImageElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.1 }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <Img
      ref={imgRef}
      src={isVisible ? src : undefined}
      alt={alt}
      className={className}
      style={style}
      w={w}
      h={h}
      borderRadius={borderRadius}
      objectFit="cover"
      loading="lazy"
      decoding="async"
      objectPosition={"center"}
    />
  );
};
