export interface IListener<T> {
  prePersist: (record: T) => void;
}
