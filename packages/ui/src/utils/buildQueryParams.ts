import { ColumnFiltersState } from '@tanstack/react-table';

export const buildQueryParams = (filters: ColumnFiltersState): string =>
  new URLSearchParams(
    filters.flatMap(({ id, value }) =>
      Array.isArray(value) && value.length === 2
        ? [
            [`${id}[gte]`, String(value[0])],
            [`${id}[lte]`, String(value[1])],
          ]
        : [[id, String(value)]],
    ),
  ).toString();

// const queryParams = new URLSearchParams(
//   columnFilters.flatMap(({ id, value }) => {
//     if (Array.isArray(value) && value.length === 2) {
//       return [
//         [`${id}[gte]`, value[0]],
//         [`${id}[lte]`, value[1]],
//       ];
//     }
//     return [[id, value]];
//   })
// ).toString();
