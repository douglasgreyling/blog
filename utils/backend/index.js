export const backendURL =
  process.env.NODE_ENV !== "development"
    ? process.env.NEXT_PUBLIC_BACKEND_URL
    : "";
