import { ofNullable } from '../optional';

interface MemoOptions {
  name?: string;
}

export const memo = <T>(provider: () => T, options: MemoOptions = {}): () => T => {
  let inInvocation: boolean = false;
  let hasValue: boolean = false;
  let value: T;

  return () => {
    if (inInvocation) {
      const name = ofNullable(options.name)
        .map((n) => ` '${n}'`)
        .orElse('');
      throw new Error(`Circular definition when trying to instantiate singleton${name}`);
    }
    if (!hasValue) {
      inInvocation = true;
      value = provider();
      if (typeof (value as unknown as Promise<T>)?.then === 'function') {
        // Detect reentrancy in async providers
        (value as unknown as Promise<T>).then(() => {
          inInvocation = false;
        });
      } else {
        inInvocation = false;
      }
      hasValue = true;
    }

    return value;
  };
};
