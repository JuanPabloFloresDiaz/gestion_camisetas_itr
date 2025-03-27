// src/theme.ts
const customTheme = {
  // Chakra espera la propiedad _config en lugar de config.
  _config: {
    initialColorMode: "light",
    useSystemColorMode: false,
  },
  colors: {
    brand: {
      50: "#e0f2ff",
      500: "#3182ce",
      900: "#1a365d",
    },
  },
  // Aquí podrías agregar más personalizaciones (tipografía, breakpoints, etc.)
};

export default customTheme;
