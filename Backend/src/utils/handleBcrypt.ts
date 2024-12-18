import { compareSync, hashSync } from "bcrypt-ts";

export const hashPassword = (password: string): string => {
  return hashSync(password, 10);
};

export const comparePassword = (password: string, hash: string): boolean => {
  return compareSync(password, hash);
};