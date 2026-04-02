export const FormMode = {
  cancel: 0,
  view: 1,
  edit: 2,
  new: 3,
  save: 4,
} as const;

export type FormMode = (typeof FormMode)[keyof typeof FormMode];
