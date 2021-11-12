/* eslint-disable padded-blocks */

import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'

interface KV {
  [header: string]: unknown;
}

interface Headers {
  [header: string]: string;
}

interface Ctor {
  baseURL?: string;
  accessTokenFn?: () => string | undefined;
  headers?: Headers;
}

export default class DiscoverySearcher {
  protected baseURL?: string;
  protected accessTokenFn?: () => (string | undefined);
  protected headers: Headers = {};

  constructor ({ baseURL, headers, accessTokenFn }: Ctor) {
    this.baseURL = baseURL
    this.accessTokenFn = accessTokenFn
    this.headers = {
      /**
       * All we send is JSON
       */
      'Content-Type': 'application/json',
    }

    this.setHeaders(headers)
  }

  setHeaders (headers?: Headers): DiscoverySearcher {
    if (typeof headers === 'object') {
      this.headers = headers
    }

    return this
  }

  api (): AxiosInstance {
    const headers = { ...this.headers }
    const accessToken = this.accessTokenFn ? this.accessTokenFn() : undefined
    if (accessToken) {
      headers.Authorization = 'Bearer ' + accessToken
    }

    return axios.create({
      withCredentials: true,
      baseURL: this.baseURL,
      headers,
    })
  }

  async getSearchData (a: string, extra: AxiosRequestConfig = {}): Promise<KV> {
    if (!a) throw Error('field search query is empty')
    const cfg: AxiosRequestConfig = {
      ...extra,
      method: 'get',
      url: this.getSearchDataEndpoint(a),
    }

    return this.api().request(cfg)
  }

  getSearchDataEndpoint (a: string): string {
    return `/?q=${a}`

  }

}
