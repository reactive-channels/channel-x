import { HttpMethod } from './HttpMethod';
export interface HttpInfo {
    method?: HttpMethod;
    url?: string;
    data?: any;
    options?: any;
    func?: any;
}
