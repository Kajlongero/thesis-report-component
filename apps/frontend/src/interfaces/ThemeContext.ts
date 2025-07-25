export type Theme = "dark" | "light";

export interface ThemeContextInterface {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}
