interface QueryParameters {
  key: string,
  value: string
}

export const buildUrl = (url: string, params?: QueryParameters[]) => {
  if (params && params.length) {
    const query = new URLSearchParams();
    params.forEach(param => query.append(param.key, param.value));
    return url + '?' + query;
  }
  return url;
}
