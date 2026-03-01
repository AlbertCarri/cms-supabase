export default function dateToSpanish(date) {
  const time = new Date(date);
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const dateSpanish = time.toLocaleDateString("es", options);
  return dateSpanish;
}
