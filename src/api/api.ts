import { APIConfig } from "../consts";

export class API {
    static get(url: string) {
        return fetch(url, {
            method: 'get',
            headers: {
              'X-Access-Token': APIConfig.apiKey,
              'User-Agent' : APIConfig.appId,
              'Accept': '*/*',
            },
          })
          .then(response => response.json())
          .catch(error => console.log('Error while fetching:', error))
    }
    static post(url: string, params: any) {
        return fetch(url, {
            body: params,
            method: 'post',
            headers: {
              'X-Access-Token': APIConfig.apiKey,
              'User-Agent' : APIConfig.appId,
              'Accept': '*/*',
            },
          })
          .then(response => response.json())
          .catch(error => console.log('Error while fetching:', error))
    }
}