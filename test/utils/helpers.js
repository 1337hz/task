export function extractPriceValueFromString(priceString) {
  const regex = /£(\d+\.\d+)/;
  const match = priceString.match(regex)[1];
  return parseFloat(match);
}
