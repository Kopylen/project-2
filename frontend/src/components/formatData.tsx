function formatDates(dateString: string | undefined) {
  if (dateString == undefined) return;
  return dateString
    .split(",") // split into individual dates
    .map((date) =>
      new Date(date).toLocaleDateString("en-US", {
        month: "short", // "Jun"
        day: "numeric", // 26
        year: "numeric", // 2025
      })
    );
}

export default formatDates;
// ["Jan 1, 2010", "Dec 31, 2018", "Jan 1, 1960", "Dec 31, 1969"]
