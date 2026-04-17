export const calculatePrintJobTotals = (files) => {
  let totalPages = 0
  let totalPrice = 0

  const PRICES = {
    colorSimple: 90,
    colorDoble: 130,
    bnSimple: 80,
    bnDoble: 120,
  }

  files.forEach(file => {
    const { pages, color, faz } = file

    totalPages += pages

    // precios según color
    const simplePrice =
      color === "Color" ? PRICES.colorSimple : PRICES.bnSimple

    const doblePrice =
      color === "Color" ? PRICES.colorDoble : PRICES.bnDoble

    if (faz === "simple") {
      // todo simple faz
      totalPrice += pages * simplePrice
    } else {
      //  doble faz 
      const dobleFazSheets = Math.floor(pages / 2)
      const simpleSheets = pages % 2

      totalPrice += dobleFazSheets * doblePrice
      totalPrice += simpleSheets * simplePrice
    }
  })

  return {
    totalPages,
    totalPrice
  }
}