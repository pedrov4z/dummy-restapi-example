export const toCurrencyValue = (n: number, showCurrencySymbol = true) : string => {
  const value = isNaN(n) ? 0 : n;

  return value.toLocaleString('pt-br', {
    style: showCurrencySymbol ? 'currency' : 'decimal',
    currency:  'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })
}
