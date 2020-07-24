export interface PagedResponse<T> {
  items: T[];
  totalRows: number;
  hasNext: boolean;
  hasPrevious: boolean;
  pageNumber: number;
  pageSize: number;
}
