export function getSortString(
  sortOptions: { id: string; desc: boolean }[],
): string {
  return sortOptions.map((opt) => (opt.desc ? opt.id : `-${opt.id}`)).join(' ');
}
