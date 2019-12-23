import i18n from "./../translations/i18n";

export function fromCentsToDollars (cents){
  if (cents || cents === 0) {
    return i18n.t("devise", { value: (cents / 100).toFixed(2) });
  }
};
