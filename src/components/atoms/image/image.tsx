import { cn } from "@/utils/cn";

export type ImageProps = {
  src?: string;
  alt?: string;
  className?: string;
};

const Image = ({ src, alt, className, ...props }: ImageProps) => (
  <img
    src={src}
    alt={alt}
    className={cn("w-full h-auto object-cover rounded-md", className)}
    {...props}
  />
);

export default Image;
