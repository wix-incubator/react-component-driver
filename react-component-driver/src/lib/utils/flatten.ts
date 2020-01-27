export function flatten<X>(arrays: X[][]): X[] {
  return Array.prototype.concat.call([] as X[], ...arrays);
}
