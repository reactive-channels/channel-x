import { mapMetaData } from "./vue/mapMetaData";

export const mapDataByPlatform = (data: any) => {
  console.log("mapDataByPlatform", data);
  const platform = data.platform;
  if (platform === "VUE") {
    return mapMetaData(data.setupState);
  }
  return data.info;
};
