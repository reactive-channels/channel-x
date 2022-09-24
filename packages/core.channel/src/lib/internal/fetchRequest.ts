import { HttpInfo } from '../types/HttpInfo';

export async function fetchRequest(httpInfo:HttpInfo):Promise<any> {
  return fetch(httpInfo.url as string, httpInfo).then((response) => response.json());
}
