/**
 * The CommandItem type represents an individual command that can be displayed
 * in the Command Palette results dropdown.
 */
export type CommandItem = {
  id: string;
  title: string;
  description?: string;
  icon?: string;
  href?: string;
  tags?: string[];
};
