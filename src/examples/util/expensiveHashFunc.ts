import crypto from 'crypto-js';

export const expensiveHashFunc = (str: string) => {
  return crypto
    .PBKDF2(str, 'meow', {
      hasher: crypto.algo.SHA256,
      keySize: 4,
      iterations: 100000,
    })
    .toString(crypto.enc.Hex);
};
