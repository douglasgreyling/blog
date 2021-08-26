const prod = process.env.NODE_ENV === "production";

module.exports = {
  "process.env.NEXT_PUBLIC_BACKEND_URL": prod ? "/blog" : "",
};
