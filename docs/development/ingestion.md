# Data Ingestion

Data ingestion is the process of getting expedition data from CSV files into the database in a structured way.

## How It Works

1. **Contributors upload CSV files** through the frontend (e.g., `AE_GNSS_891_2026-01-12_12:01:22.csv`)
2. **The frontend triggers a webhook** to start the processing pipeline
3. **n8n runs an ETL workflow** to process the file
4. **Data is stored in the database** ready to be viewed

## What is ETL?

**ETL** stands for **Extract, Transform, Load**:

- **Extract:** Read data from the CSV file
- **Transform:** Clean and format the data to match our database structure
  - Parse dates and times
  - Validate data types
  - Handle missing or invalid values
- **Load:** Insert the processed data into the database

## What is n8n?

[n8n](https://n8n.io/) is a workflow automation tool. Think of it as a visual programming tool where you can:
- Connect different services together
- Define steps to process data
- Handle errors and retries automatically
- Monitor what's happening in real-time

## CSV File Format

Expedition CSV files follow a naming convention:
```
{OWNER}_{INSTRUMENT_TYPE}_{INSTRUMENT_NUMBER}_{TIMESTAMP}.csv
```

Examples from test files:
- `AE_GNSS_891_2026-01-12_12:01:22.csv` - Astrolabe Expeditions, GNSS instrument, station 891
- `AE_TSG_629_2026-01-12_12:00:00.csv` - Astrolabe Expeditions, TSG instrument, station 629
- `OSO_MD_291_2026-01-12_12:02:44.csv` - OSO project, MD instrument, station 291

## Development & Testing

You can find dummy/test CSV files in:
```
tests/dummy/generated/
```

Use these to test the ingestion pipeline without real expedition data.
