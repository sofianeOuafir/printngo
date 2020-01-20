import i18n from "./../translations/i18n";

export function fromCentsToDollars(cents, withDevise = true) {
  if (cents || cents === 0) {
    const dollars = (cents / 100).toFixed(2);
    if (withDevise) {
      return dollarsWithDevise(dollars);
    } else {
      return dollars;
    }
  }
}

export function dollarsWithDevise(value) {
  return i18n.t("devise", { value });
}

export function fromDollarsToCents(dollars) {
  if (dollars || dollars === 0) {
    return dollars * 100;
  }
}
