export function formatDistanceToNow(
  date: Date,
  options?: { addSuffix?: boolean }
): string {
  const now = new Date();
  const diffInMs = now.getTime() - date.getTime();
  const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
  const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

  let result = "";

  if (diffInMinutes < 1) {
    result = "less than a minute";
  } else if (diffInMinutes < 60) {
    result = `${diffInMinutes} minute${diffInMinutes > 1 ? "s" : ""}`;
  } else if (diffInHours < 24) {
    result = `${diffInHours} hour${diffInHours > 1 ? "s" : ""}`;
  } else {
    result = `${diffInDays} day${diffInDays > 1 ? "s" : ""}`;
  }

  return options?.addSuffix ? `${result} ago` : result;
}
