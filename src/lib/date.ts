// @ts-nocheck

export const todayMs = () => {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d.getTime();
};

export const formatDateFromMs = (ms) => {
  return new Date(ms).toLocaleDateString("en-US", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
};

export const formatDate = (gibberish) => {
  const date = new Date(gibberish);
  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "short" });
  const year = date.getFullYear();

  return `${day} ${month}, ${year}`;
};
