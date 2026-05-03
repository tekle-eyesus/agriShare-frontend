export const formatETB = (n) =>
  new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(n) +
  " ETB";

export const formatNumber = (n) => new Intl.NumberFormat("en-US").format(n);

export const timeAgo = (iso) => {
  const diff = Date.now() - new Date(iso).getTime();
  const m = Math.floor(diff / 60000);
  if (m < 1) return "just now";
  if (m < 60) return `${m} min${m === 1 ? "" : "s"} ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h} hour${h === 1 ? "" : "s"} ago`;
  const d = Math.floor(h / 24);
  return `${d} day${d === 1 ? "" : "s"} ago`;
};
