import { vueChannel } from "./vue.channel";

describe("vueChannel", () => {
  it("should work", () => {
    expect(vueChannel()).toEqual("vue.channel");
  });
});
