export function parseFileName(name: string) {
  // Example: Thermometer_20231015_143000.csv
  const regex = /^([A-Za-z0-9]+)_(\d{8})_(\d{6})\.csv$/;
  const match = name.match(regex);
  if (!match) return null;
  const [, instrument, date, time] = match;
  return { instrument, date, time };
}
