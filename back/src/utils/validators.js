function invalidDates(start, end) {
  if (new Date(start) >= new Date(end)) {
    return true;
  }
  return false;
}

function checkInBeforeToday(date) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const checkInDate = new Date(date);
  checkInDate.setHours(0, 0, 0, 0);

  if (checkInDate < today) {
    return true;
  }
  return false;
}

function numberOfNights(start, end) {
  const nights = (new Date(end) - new Date(start)) / (1000 * 60 * 60 * 24);
  return nights;
}

module.exports = { checkInBeforeToday, invalidDates, numberOfNights };