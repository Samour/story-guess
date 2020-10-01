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
      inInvocation = false;
      hasValue = true;
    }

    return value;
  };
};
