export function formatDate(dateStr, type) {
  let date = typeof dateStr === "string" ? new Date(dateStr) : dateStr;
  const month = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let dd = String(date.getDate()).padStart(2, "0");
  let yyyy = date.getFullYear();
  let mm = month[date.getMonth()];
  switch (type) {
    case "fulldate":
      return mm + " " + dd + ", " + yyyy;
    case "mm/dd/yyyy":
      return date.getMonth() + 1 + "/" + dd + "/" + yyyy;
  }
}
