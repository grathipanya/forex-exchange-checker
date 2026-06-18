export type ImageProps = {
  src?: string;
  alt?: string;
};

const Image = ({ src, alt }: ImageProps) => (
  <img
    src={src}
    alt={alt}
    className="w-full h-auto object-cover rounded-md"
  />
);

export default Image;
