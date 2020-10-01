
type MapFunction<T, R> = (value: T) => R;
type Predicate<T> = (value: T) => boolean;
type Provider<T> = () => T;

export interface Optional<T> {
  map: <R>(map: MapFunction<T, R | null | undefined>) => Optional<R>;
  filter: (filter: Predicate<T>) => Optional<T>;
  get: () => T;
  orElse: (value: T) => T;
  orElseGet: (provider: Provider<T>) => T;
  isPresent: () => boolean;
  isEmpty: () => boolean;
}

class EmptyOptional<T> implements Optional<T> {

  map<R>(map: MapFunction<T, R | null | undefined>): Optional<R> {
    return this as unknown as Optional<R>;
  }

  filter(filter: Predicate<T>): Optional<T> {
    return this;
  }

  get(): T {
    throw new Error('Cannot get value from empty optional');
  }

  orElse(value: T): T {
    return value;
  }

  orElseGet(provider: Provider<T>): T {
    return provider();
  }

  isPresent(): boolean {
    return false;
  }

  isEmpty(): boolean {
    return true;
  }
}

const emptyOptional: Optional<any> = new EmptyOptional();

class ValueOptional<T> implements Optional<T> {

  constructor(private readonly value: T) { }

  map<R>(map: MapFunction<T, R | null | undefined>): Optional<R> {
    const mappedValue: R | null | undefined = map(this.value);
    if (mappedValue === null || mappedValue === undefined) {
      return emptyOptional;
    } else {
      return new ValueOptional(mappedValue);
    }
  }

  filter(filter: Predicate<T>): Optional<T> {
    if (filter(this.value)) {
      return this;
    } else {
      return emptyOptional;
    }
  }

  get(): T {
    return this.value;
  }

  orElse(value: T): T {
    return this.value;
  }

  orElseGet(provider: Provider<T>): T {
    return this.value;
  }

  isPresent(): boolean {
    return true;
  }

  isEmpty(): boolean {
    return false;
  }
}

export const of = <T>(value: T): Optional<T> => {
  if (value === null || value === undefined) {
    throw new Error('Cannot construct optional with null value');
  } else {
    return new ValueOptional(value);
  }
};

export const ofNullable = <T>(value: T): Optional<T> => {
  if (value === null || value === undefined) {
    return emptyOptional;
  } else {
    return new ValueOptional(value);
  }
};

export const empty = <T>(): Optional<T> => emptyOptional;
