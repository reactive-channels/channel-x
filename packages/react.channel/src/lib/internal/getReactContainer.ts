export const getReactContainer = (rootElement: string) => {
  const el: any = document.querySelector(rootElement);
  const reactPropertyName: any = Object.keys(el).find((key) =>
    key.startsWith("__reactContainer$")
  );

  if (reactPropertyName) {
    return el[reactPropertyName];
  }
  return null;
};
