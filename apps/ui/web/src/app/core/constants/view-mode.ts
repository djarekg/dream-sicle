export const ViewMode = {
  cards: 'cards',
  table: 'table',
} as const;

export type ViewMode = (typeof ViewMode)[keyof typeof ViewMode];
