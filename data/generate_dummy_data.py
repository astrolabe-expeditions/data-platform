import csv
import os
from datetime import datetime, timedelta
import random

OUTPUT_DIR = "generated"
NUM_FILES = 40
BASE_DATE = datetime(2026, 1, 12, 12, 0, 0)

print(f"Generating {NUM_FILES} dummy CSV files in '{OUTPUT_DIR}' directory...")
print("This may take a few seconds.")

script_dir = os.path.dirname(os.path.abspath(__file__))
OUTPUT_DIR = os.path.join(script_dir, "generated")
os.makedirs(OUTPUT_DIR, exist_ok=True)

for i in range(NUM_FILES):
  file_datetime = BASE_DATE + timedelta(seconds=i * 82)
  filename = f"OSOCTD_{file_datetime.strftime('%Y-%m-%d_%H:%M:%S')}.csv"
  filepath = os.path.join(OUTPUT_DIR, filename)

  print(f"Creating file: {filename}")

  # Example dummy data: 10 rows, 3 columns
  rows = [
    ["id", "value1", "value2"]
  ]
  for j in range(10):
    rows.append([
      j + 1,
      random.randint(100, 999),
      random.uniform(0, 100)
    ])

  with open(filepath, "w", newline="") as csvfile:
    writer = csv.writer(csvfile)
    writer.writerows(rows)

print("Dummy CSV file generation completed.")
