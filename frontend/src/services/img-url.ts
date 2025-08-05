const getCroppedImageUrl = (url: string) => {
  const target = "media/";
  const index = url.indexOf(target) + target.length;
  const result = url.slice(0, index) + "crop/600/400/" + url.slice(index);
  return result;
};

export default getCroppedImageUrl;
