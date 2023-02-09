export function urlParams(params: Record<string, string | number>) {
  return Object.keys(params).reduce((acc, key) => {
    return acc ? `${acc}&${key}=${params[key]}` : `?${key}=${params[key]}`;
  }, '');
}
