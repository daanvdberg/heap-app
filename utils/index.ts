import queryString from 'query-string';

type Parameters = {
  [key: string]: any;
};

export const buildUrl = (url: string, params?: Parameters) => {
  if (params) {
    return url + '?' + queryString.stringify(params);
  }
  return url;
}
