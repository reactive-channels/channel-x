export const groupByComponentsAndChannels = (
  info: any,
  group: any,
  name: string
) => {
  Object.keys(info)?.forEach((key: any) => {
    const queue = info[key];
    Object.keys(queue)?.forEach((innerKey) => {
      const components: any = group[key].components;
      components[innerKey] = components[innerKey] || {
        component: {},
        channels: new Set(),
      };
      components[innerKey].component = info[key][innerKey];
      components[innerKey].channels.add(name);
    });
  });
};
