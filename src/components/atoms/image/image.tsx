import { cn } from "@/utils/cn";

export type ImageProps = {
  src?: string;
  alt?: string;
  className?: string;
  onError?: () => void;
};

const Image = ({ src, alt, className, onError, ...props }: ImageProps) => (
  <img
    src={src}
    alt={alt}
    className={cn("w-full h-auto object-cover rounded-md", className)}
    onError={onError}
    {...props}
  />
);

export default Image;
