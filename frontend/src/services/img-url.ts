import noImage from "../assets/no-image-placeholder-6f3882e0.webp";

const getCroppedImageUrl = (url: string) => {
  if (!url) return noImage;
  const target = "media/";
  const index = url.indexOf(target) + target.length;
  const result = url.slice(0, index) + "crop/600/400/" + url.slice(index);
  return result;
};

export default getCroppedImageUrl;
