export function toLocalDateTimeInput(isoString) {
  const date = new Date(isoString);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${year}-${month}-${day}T${hours}:${minutes}`;
}

export function toDatePattern(date, pattern) {
  const d = new Date(date);
  const monthMap = {
    "1": "Jan",
    "2": "Feb",
    "3": "Mar",
    "4": "Apr",
    "5": "May",
    "6": "Jun",
    "7": "Jul",
    "8": "Aug",
    "9": "Sep",
    "10": "Oct",
    "11": "Nov",
    "12": "Dec"
  }

  if (isNaN(d.getTime())) {
    throw new Error("Invalid date passed to format()");
  }

  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");

  if (pattern === "yyyy-MM") {
    return `${year}-${month}`;
  } else if (pattern === "MMM-yyyy") {
    console.log(`${monthMap[month]}-${year}`)
    return `${monthMap[month]}-${year}`;
  }

  throw new Error("Unsupported format pattern");
}

