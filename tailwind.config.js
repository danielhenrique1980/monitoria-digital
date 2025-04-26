module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Paleta de cores personalizada baseada na imagem fornecida
        fundo: "#ffffff", // Cor de fundo principal
        titulo: "#094067", // Cor dos títulos
        paragrafo: "#5f6c7b", // Cor de parágrafos
        botao: "#3da9fc", // Cor de fundo dos botões
        textoBotao: "#ffffff", // Cor do texto dos botões
        avc: "#094067", // Cor usada em ilustrações (AVC)
        principal: "#ffffff", // Cor principal de destaque
        destaque: "#3da9fc", // Cor de elementos em destaque
        secundario: "#90b4ce", // Cor secundária
        terciario: "#ef4565", // Cor terciária
      },
    },
  },
  plugins: [],
};