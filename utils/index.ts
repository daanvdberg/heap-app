import queryString from 'query-string';

type Parameters = {
  [key: string]: any;
};

export const buildUrl = (url: string, params?: Parameters) => {
  if (params) {
    return url + '?' + queryString.stringify(params);
  }
  return url;
};

export const truncate = (str: string, length: number, includeElipses = false) =>
  str.length > length ? `${str.substring(0, includeElipses ? length - 3 : length).trim()}…` : str;

export const isMobile = () => {
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Browser_detection_using_the_user_agent#mobile_device_detection
  let hasTouchScreen = false;
  if (navigator && 'maxTouchPoints' in navigator) {
    hasTouchScreen = navigator.maxTouchPoints > 0;
  } else if (navigator && 'msMaxTouchPoints' in navigator) {
    // @ts-ignore
    hasTouchScreen = navigator.msMaxTouchPoints > 0;
  } else {
    const mQ = matchMedia?.('(pointer:coarse)');
    if (mQ?.media === '(pointer:coarse)') {
      hasTouchScreen = !!mQ.matches;
    } else if ('orientation' in window) {
      hasTouchScreen = true; // deprecated, but good fallback
    }
    // else {
    //   // Only as a last resort, fall back to user agent sniffing
    //   const UA = navigator.userAgent;
    //   hasTouchScreen =
    //     /\b(BlackBerry|webOS|iPhone|IEMobile)\b/i.test(UA) ||
    //     /\b(Android|Windows Phone|iPad|iPod)\b/i.test(UA);
    // }
  }
  return hasTouchScreen;
};

export const cls = (input: string) => input.replace(/\s+/gm, ' ').split(' ').join(' ').trim();
