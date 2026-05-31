// theme.jsx — Design tokens, theme definitions, ThemeProvider
// Exports: THEMES, ThemeContext, ThemeProvider, useTheme, getThemeCSS

const THEMES = {
  chili: {
    name: "Chili",
    primary: "#C23B22",
    primaryLight: "#F2DDD8",
    secondary: "#2D8B5D",
    secondaryLight: "#D4EEDF",
    accent: "#E8913A",
    bg: "#FAF6F1",
    surface: "#FFFFFF",
    surfaceAlt: "#F5EDE4",
    text: "#1A1715",
    textSecondary: "#7A7067",
    textTertiary: "#A89E94",
    border: "#E8DFD4",
    shadow: "rgba(26, 23, 21, 0.08)",
    mapBg: "#EDE7DF",
    mapRoad: "#FDFCFA",
    mapWater: "#C8DAE8",
    mapPark: "#D5E4D0",
    navBg: "#FFFFFF",
    pinBg: "#C23B22",
    pinText: "#FFFFFF",
    budgetFill: "#C23B22",
    verified: "#2D8B5D",
    cardHover: "#FDF8F4",
  },
  kaya: {
    name: "Kaya",
    primary: "#9B6B2F",
    primaryLight: "#F0E4D0",
    secondary: "#C47D3A",
    secondaryLight: "#FAEBD7",
    accent: "#6B8F3A",
    bg: "#F9F5EE",
    surface: "#FFFFFF",
    surfaceAlt: "#F2EBE0",
    text: "#2C2317",
    textSecondary: "#7D6E5C",
    textTertiary: "#A69882",
    border: "#E5D9C8",
    shadow: "rgba(44, 35, 23, 0.08)",
    mapBg: "#EAE2D5",
    mapRoad: "#FAF7F2",
    mapWater: "#BFD4E2",
    mapPark: "#D2DFC8",
    navBg: "#FFFFFF",
    pinBg: "#9B6B2F",
    pinText: "#FFFFFF",
    budgetFill: "#9B6B2F",
    verified: "#6B8F3A",
    cardHover: "#FAF5EC",
  },
  pandan: {
    name: "Pandan",
    primary: "#1A7D5A",
    primaryLight: "#D4EEDF",
    secondary: "#D97B4A",
    secondaryLight: "#FAEBD7",
    accent: "#2B8A8A",
    bg: "#F4F7F5",
    surface: "#FFFFFF",
    surfaceAlt: "#EDF2EE",
    text: "#1C2B24",
    textSecondary: "#5E7A6A",
    textTertiary: "#8FA99A",
    border: "#D4E0D8",
    shadow: "rgba(28, 43, 36, 0.07)",
    mapBg: "#E4ECE6",
    mapRoad: "#F7FAF8",
    mapWater: "#B8D0DE",
    mapPark: "#C5DDCA",
    navBg: "#FFFFFF",
    pinBg: "#1A7D5A",
    pinText: "#FFFFFF",
    budgetFill: "#1A7D5A",
    verified: "#1A7D5A",
    cardHover: "#F0F7F3",
  },
  pasar: {
    name: "Pasar Malam",
    primary: "#FF6B35",
    primaryLight: "#3D2A20",
    secondary: "#FFD23F",
    secondaryLight: "#3D3520",
    accent: "#FF4D6D",
    bg: "#141420",
    surface: "#1E1E30",
    surfaceAlt: "#252540",
    text: "#F0ECE6",
    textSecondary: "#A09888",
    textTertiary: "#6B6360",
    border: "#2E2E45",
    shadow: "rgba(0, 0, 0, 0.3)",
    mapBg: "#181828",
    mapRoad: "#222238",
    mapWater: "#1A2A3A",
    mapPark: "#1A2E22",
    navBg: "#1A1A2E",
    pinBg: "#FF6B35",
    pinText: "#FFFFFF",
    budgetFill: "#FF6B35",
    verified: "#4ADE80",
    cardHover: "#28284A",
  },
};

const FONTS = {
  jakarta: {
    name: "Jakarta",
    heading: "'Plus Jakarta Sans', sans-serif",
    body: "'Plus Jakarta Sans', sans-serif",
    import: "Plus+Jakarta+Sans:wght@400;500;600;700;800",
  },
  space: {
    name: "Space",
    heading: "'Space Grotesk', sans-serif",
    body: "'DM Sans', sans-serif",
    import: "Space+Grotesk:wght@400;500;600;700&family=DM+Sans:wght@400;500;600",
  },
  outfit: {
    name: "Outfit",
    heading: "'Outfit', sans-serif",
    body: "'Figtree', sans-serif",
    import: "Outfit:wght@400;500;600;700;800&family=Figtree:wght@400;500;600",
  },
};

const ThemeContext = React.createContext();

function ThemeProvider({ theme, font, density, children }) {
  const t = THEMES[theme] || THEMES.chili;
  const f = FONTS[font] || FONTS.jakarta;
  const dScale = density === 'compact' ? 0.85 : density === 'spacious' ? 1.2 : 1;
  const value = React.useMemo(() => ({ ...t, font: f, density, dScale, themeName: theme }), [theme, font, density]);

  React.useEffect(() => {
    let link = document.getElementById('gfont-link');
    if (!link) {
      link = document.createElement('link');
      link.id = 'gfont-link';
      link.rel = 'stylesheet';
      document.head.appendChild(link);
    }
    link.href = `https://fonts.googleapis.com/css2?family=${f.import}&display=swap`;
  }, [f.import]);

  return React.createElement(ThemeContext.Provider, { value }, children);
}

function useTheme() {
  return React.useContext(ThemeContext);
}

Object.assign(window, { THEMES, FONTS, ThemeContext, ThemeProvider, useTheme });
