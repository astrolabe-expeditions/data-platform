export function parseFileName(name: string) {
  const regex = /^([A-Z]+_[A-Z]+_[0-9]+)_([\d-]{10})_([\d:]{8})\.csv$/;
  const match = name.match(regex);
  if (!match) return null;
  const [, instrument, date, time] = match;
  return { instrument, date, time };
}
