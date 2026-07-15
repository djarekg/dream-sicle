export type SortDirection = 'asc' | 'desc' | null;
export type SortableColumn = 'name' | 'description' | 'productType' | 'price' | 'gender';
export type SortState = {
  direction: SortDirection;
  column: SortableColumn | null;
};
