export interface PageResponse<T> {
  items: T[];
  total: number;
  offset: number;
  limit: number;
}
