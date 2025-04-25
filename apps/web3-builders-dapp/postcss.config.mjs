const config = {
  plugins: ["@tailwindcss/postcss"],
  tailwindcss: {
    config: "./tailwind.config.js",
    applyBaseStyles: true,
    applyComponentsStyles: true,
    applyUtilitiesStyles: true,
    applyGlobalStyles: true,
    applyScreenStyles: true,  
   
  },
  autoprefixer: {},
  "postcss-nested": {},
  "postcss-custom-properties": {
    preserve: false,
  },
};

export default config;
