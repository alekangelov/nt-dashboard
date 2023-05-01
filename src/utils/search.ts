import { SearchEngine } from '../store/settings';

export const searchSettings: Record<SearchEngine, (val: string) => any> = {
  Google: (val) =>
    (window.location.href = `https://www.google.com/search?q=${val}`),
  DuckDuckGo: (val) =>
    (window.location.href = `https://duckduckgo.com/?q=${val}`),
  Bing: (val) =>
    (window.location.href = `https://www.bing.com/search?q=${val}`),
  Yahoo: (val) =>
    (window.location.href = `https://search.yahoo.com/search?p=${val}`),
  Baidu: (val) => (window.location.href = `https://www.baidu.com/s?wd=${val}`),
};
