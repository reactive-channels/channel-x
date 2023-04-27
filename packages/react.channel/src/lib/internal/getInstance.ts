export const getInstance = (rootElement: string) => {
  const el: any = document.querySelector(rootElement);
  const reactPropertyName: any = Object.keys(el).find((key) =>
    key.startsWith("__reactFiber$")
  );

  if (reactPropertyName) {
    return el[reactPropertyName];
  }
  return null;
};
