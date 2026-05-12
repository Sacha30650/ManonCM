export type Pack = {
  id: string;
  name: string;
  price: string;
  highlight?: boolean;
  features: string[];
  badge?: string;
};

export type UnitItem = {
  label: string;
  range: string;
};
