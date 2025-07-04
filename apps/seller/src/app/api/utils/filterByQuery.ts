export function filterByQuery<T extends object>(query: string, data: T[]): T[] {
  const filters = new URLSearchParams(query);

  return data.filter((item) => {
    return Array.from(filters.entries()).every(([key, value]) => {
      if (key in item) {
        const itemValue = item[key as keyof T];

        if (typeof itemValue === 'string') {
          return (itemValue as string)
            .toLowerCase()
            .includes(value.toLowerCase());
        } else if (typeof itemValue === 'number') {
          return (itemValue as number) === Number(value);
        } else if (typeof itemValue === 'boolean') {
          return (itemValue as boolean) === (value === 'true');
        }
        return false;
      }
      return true;
    });
  });
}
