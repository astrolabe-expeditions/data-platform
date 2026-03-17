type Filters = Record<string, string[]>;

interface FilterChoice {
  label: string;
  value: string;
}

export type { FilterChoice, Filters };
