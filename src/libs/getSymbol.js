  export const getSymbol = (name) => {
    if (name) {
      const coinSymbol = name.toLowerCase().replace(" ", "-");
      return `https://c1.coinlore.com/img/16x16/${coinSymbol}.png`
    }
  }
