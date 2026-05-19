import { createTheme, MantineColorsTuple } from "@mantine/core";

const accent: MantineColorsTuple = [
  "#eafbe7",
  "#c9f4c0",
  "#a4ec97",
  "#7be46b",
  "#5bdd49",
  "#46d932",
  "#37c422",
  "#26ab14",
  "#1a960a",
  "#0a8000",
];

const gold: MantineColorsTuple = [
  "#fff8e1",
  "#ffecb3",
  "#ffe082",
  "#ffd54f",
  "#ffca28",
  "#ffc107",
  "#ffb300",
  "#ffa000",
  "#ff8f00",
  "#ff6f00",
];

const danger: MantineColorsTuple = [
  "#ffe9e9",
  "#ffc9c9",
  "#ffa3a3",
  "#ff7676",
  "#ff4d4d",
  "#ff2d2d",
  "#f51919",
  "#dc0d0d",
  "#c10000",
  "#a10000",
];

export const theme = createTheme({
  primaryColor: "accent",
  colors: { accent, gold, danger },
  primaryShade: { light: 6, dark: 5 },
  defaultRadius: "md",
  fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
  headings: {
    fontFamily: "'Inter', system-ui, sans-serif",
    fontWeight: "700",
  },
  cursorType: "pointer",
  components: {
    Button: { defaultProps: { radius: "md" } },
    Card: { defaultProps: { radius: "lg", shadow: "md", withBorder: true } },
    Paper: { defaultProps: { radius: "lg", shadow: "sm" } },
  },
});
