const sanitizer = (input) => {
  if (typeof input !== "string") return "";
  return input
    .replace(/<[^>]*>?/gm, "") // remove HTML tags
    .replace(/\.\.\//g, "") // prevent directory traversal
    .replace(/[^\w\s\-|()]/g, "") // allow only safe chars
    .trim();
};

export default sanitizer;
