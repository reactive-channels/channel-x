import { HttpMethod } from './HttpMethod';

export interface Endpoint{
    url:string,
    method?:HttpMethod,
    data?:any,
    options?:any
}
