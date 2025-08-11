function formatDates(dateString: string | undefined) {
  if (dateString === undefined) return;
  return dateString.split(",").map((date) =>
    new Date(date)
      .toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
      .toUpperCase()
  );
}

export default formatDates;
// ["Jan 1, 2010", "Dec 31, 2018", "Jan 1, 1960", "Dec 31, 1969"]
