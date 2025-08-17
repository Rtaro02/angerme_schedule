# Angerme Schedule Scraper

This project scrapes the `sayum.in` website to get the event schedule for the idol group Angerme.

## Installation

1.  Clone the repository.
2.  Install the dependencies:

```bash
npm install
```

## Usage

To run the script, use the following command:

```bash
node fetch_parse.js
```

This will print the schedule to the console in CSV format. You can redirect the output to a file:

```bash
node fetch_parse.js > schedule.csv
```

## Output Format

The output is a CSV file with the following columns:

*   `DATE`: The date of the event (YYYY/MM/DD).
*   `PREFECTURE`: The prefecture where the event takes place.
*   `PLACE`: The venue of the event.
*   `CONTENT`: A description of the event.
*   A column for each member of Angerme, indicating their presence (`o`) or absence (`x`).
