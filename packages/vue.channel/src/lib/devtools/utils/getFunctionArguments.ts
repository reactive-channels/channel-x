import { removeQuotes } from './removeQuotes';

export const getFunctionArguments = (func: string) => {
  let args: any = /\(\s*([^)]+?)\s*\)/.exec(func);
  if (args?.[1]) {
    args = args[1].split(/\s*,\s*/);
  }
  return removeQuotes(args[0]);
};
