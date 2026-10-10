/** Turn a category slug like "mobile-accessories" into "Mobile Accessories". */
export function humanizeCategory(slug: string): string {
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

/** Format a price as a US dollar string, e.g. 999 -> $999.00 */
export function formatPrice(price: number): string {
  return `$${price.toFixed(2)}`;
}
