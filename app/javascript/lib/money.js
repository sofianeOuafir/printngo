export const fromCentsToDollars = (cents) => {
  if(cents || cents === 0) {
    return `$${(cents / 100).toFixed(2)}`;
  }
}