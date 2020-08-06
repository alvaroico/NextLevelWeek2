export default function convertHourMinutes(time: String) {
  const [hour, minutes] = time.split(":").map(Number);
  const timeInMinutes = hour * 60 + minutes;
  
  return timeInMinutes;
}
