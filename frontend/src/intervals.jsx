export function dateToUnix(timestamp) {
  console.log("timestamp is" + timestamp);
  if (!timestamp) return 0;
  let times = timestamp.split("-");
  let date = new Date(times[0], times[1] - 1, times[2]);
  return date.getTime();
}

export function intervalLength(timestamp1, timestamp2) {
  let date1 = dateToUnix(timestamp1) / 86400000;
  let date2 = dateToUnix(timestamp2) / 86400000;
  return Math.floor(date2 - date1) + 1;
}

export function isNotPast(timestamp) {
  let date = dateToUnix(timestamp);
  let today = Date.now() - (Date.now() % 86400000);
  console.log(date / 86400000, today / 86400000, Date.now() / 86400000);
  return date >= today;
}
