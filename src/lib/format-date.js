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

  if (isNaN(d.getTime())) {
    throw new Error("Invalid date passed to format()");
  }

  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");

  if (pattern === "yyyy-MM") {
    return `${year}-${month}`;
  }

  throw new Error("Unsupported format pattern");
}

