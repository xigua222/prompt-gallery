const BASE_URL = import.meta.env.BASE_URL;

export function getImageUrl(path: string): string {
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }
  if (path.startsWith('/')) {
    return BASE_URL + path.slice(1);
  }
  return path;
}
