// WARNING: This is not a drop in replacement solution and
// it might not work for some edge cases. Test your code!
export const set = (obj: any, path: string, value: any) => {
  // Regex explained: https://regexr.com/58j0k
  const pathArray = Array.isArray(path)
    ? path
    : path.match(/([^[.\]])+/g) || [];
  // @ts-ignore
  pathArray.reduce((acc: any, key: string, i: number) => {
    if (acc[key] === undefined) acc[key] = {};
    if (i === pathArray.length - 1) acc[key] = value;
    return acc[key];
  }, obj);
};
