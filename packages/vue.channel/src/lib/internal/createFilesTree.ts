export function createFileTree(paths: string[]) {
  let result: any[] = [];
  let level = { result };

  paths.forEach((path) => {
    path.split('/').reduce((r: any, name: any, i: number, a: any) => {
      if (!r[name]) {
        r[name] = { result: [] };
        r.result.push({ name, children: r[name].result });
      }
      return r[name];
    }, level);
  });
}
