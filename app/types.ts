export type Payment = {
  id: string;
  date: string;
  description: string;
  amount: number;
};

export type SearchFilters = {
  from?: Date;
  to?: Date;
};
