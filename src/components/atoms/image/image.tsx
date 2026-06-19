import { cn } from "@/utils/cn";

export type ImageProps = {
  src?: string;
  alt?: string;
  className?: string;
  onError?: () => void;
  onLoad?: () => void;
};

const Image = ({
  src,
  alt,
  className,
  onError,
  onLoad,
  ...props
}: ImageProps) => (
  <img
    src={src}
    alt={alt}
    className={cn("w-full h-auto object-cover rounded-md", className)}
    onError={onError}
    onLoad={onLoad}
    {...props}
  />
);

export default Image;
