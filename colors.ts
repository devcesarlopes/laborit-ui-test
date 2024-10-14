export const colors = {
  input:{
    background: "var(--color-input-background)",
    border: "var(--color-input-border)",
    text: "var(--color-input-text)",
    placeholder: "var(--color-input-placeholder)",
    icon: "var(--color-input-icon)",
  },
  background: "var(--color-background)",
  brainbox: "var(--color-brainBox)",
  content: {
    background: "var(--color-content-background)",
    text: "var(--color-content-text)"
  },
  primary: "var(--color-primary)",
  secondary: "var(--color-secondary)",
  tertiary: "var(--color-tertiary)",
  accent: "var(--color-accent)",
  grey: "var(--color-grey)",
  slate: "var(--color-slate)",
  dark: "var(--color-dark)",
  light: "var(--color-light)",
  border : "var(--color-border)",
  overlay: "var(--color-overlay)",
};

export type ColorScheme = typeof colors;
