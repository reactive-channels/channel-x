export const removeQuotes = (str: string) =>
  str.replace(/['"]+/g, '').replace(/[""]+/g, '');
