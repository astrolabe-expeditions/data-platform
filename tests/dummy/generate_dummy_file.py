import csv
import os
from datetime import datetime, timedelta
import random
import argparse
import sys

def main():
  parser = argparse.ArgumentParser(description="Generate dummy CSV files for testing.")
  parser.add_argument("-n", "--num-files", type=int, default=40, help="Number of files to generate (default: 40)")
  parser.add_argument("-o", "--output-dir", type=str, default="generated", help="Output directory (default: generated)")
  parser.add_argument("--base-date", type=str, default="2026-01-12_12:00:00", help="Base date in YYYY-MM-DD_HH:MM:SS format")
  parser.add_argument("--bad-header", action="store_true", help="Generate files with non-snake-case headers (error case)")
  parser.add_argument("--bad-datetime", action="store_true", help="Generate rows with bad datetime format (error case)")
  parser.add_argument("--gps", action="store_true", help="Add GPS columns (lat, long) in WGS84 DDD format, simulating boat movement")
  parser.add_argument("-c", "--clean", default=False, action="store_true", help="Clean the output directory before generating files")
  args = parser.parse_args()

  try:
    base_date = datetime.strptime(args.base_date, "%Y-%m-%d_%H:%M:%S")
  except ValueError:
    print("Error: base-date must be in YYYY-MM-DD_HH:MM:SS format.", file=sys.stderr)
    sys.exit(1)

  script_dir = os.path.dirname(os.path.abspath(__file__))
  output_dir = os.path.join(script_dir, args.output_dir)
  if args.clean and os.path.exists(output_dir):
    for filename in os.listdir(output_dir):
      file_path = os.path.join(output_dir, filename)
      if os.path.isfile(file_path):
        os.remove(file_path)
  os.makedirs(output_dir, exist_ok=True)

  print(f"Generating {args.num_files} dummy CSV files in '{output_dir}' directory...")

  instrument_serials = ["AE_TSG_629", "AE_GNSS_891", "OSO_MD_291", "UNKNOWN_123"]

  for i in range(args.num_files):
    file_datetime = base_date + timedelta(seconds=i * 82)
    instrument = random.choice(instrument_serials)
    filename = f"{instrument}_{file_datetime.strftime('%Y-%m-%d_%H:%M:%S')}.csv"
    filepath = os.path.join(output_dir, filename)

    print(f"Creating file: {filename}")

    # Header: datetime, value1, value2 (or bad header), plus lat/long if GPS
    if args.bad_header:
      headers = ["DateTime", "Value 1", "Value-2"]
      if args.gps:
        headers += ["Lat", "Long"]
    else:
      headers = ["datetime", "value1", "value2"]
      if args.gps:
        headers += ["lat", "long"]

    rows = [headers]

    # Simulate boat movement: start at random ocean point, move slightly each row
    if args.gps:
      # Example: Atlantic Ocean, start near 40N, -20W
      start_lat = 40.0 + random.uniform(-2, 2)
      start_long = -20.0 + random.uniform(-2, 2)
      lat_step = random.uniform(0.0005, 0.002)  # small step per row
      long_step = random.uniform(0.0005, 0.002)

    for j in range(10):
      row_dt = file_datetime + timedelta(seconds=j * 5)
      if args.bad_datetime and random.random() < 0.3:
        dt_str = row_dt.strftime("%d/%m/%Y %H:%M:%S")
      else:
        dt_str = row_dt.strftime("%Y-%m-%dT%H:%M:%SZ")

      value1 = random.randint(100, 999)
      value2 = random.uniform(0, 100)

      row = [dt_str, value1, value2]
      if args.gps:
        lat = start_lat + j * lat_step
        long = start_long + j * long_step
        row += [f"{lat:.6f}", f"{long:.6f}"]

      rows.append(row)

    with open(filepath, "w", newline="") as csvfile:
      writer = csv.writer(csvfile)
      writer.writerows(rows)

  print("Dummy CSV file generation completed.")

if __name__ == "__main__":
  main()
