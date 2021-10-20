const config = {
  mode: "jit",
  purge: ["./src/**/*.{html,js,svelte,ts}"],

  theme: {
    extend: {
      colors: {
        'red': "#FF0000",
        'green': "#00FF00"
      },
    },
  },

  plugins: [],
};

module.exports = config;
