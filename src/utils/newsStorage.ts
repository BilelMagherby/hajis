import type { NewsItem } from '../data/news';
import { newsItems as initialNewsItems } from '../data/news';

const STORAGE_KEY = 'hajiss_news_items_v2';

export function getStoredNews(): NewsItem[] {
  try {
    // Remove old test/fake data storage if it exists
    if (typeof localStorage !== 'undefined' && localStorage.getItem('hajiss_news_items_v1')) {
      localStorage.removeItem('hajiss_news_items_v1');
    }

    const raw = typeof localStorage !== 'undefined' ? localStorage.getItem(STORAGE_KEY) : null;
    if (!raw) {
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(initialNewsItems));
      }
      return initialNewsItems;
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      return parsed;
    }
    return initialNewsItems;
  } catch (err) {
    console.error('Error loading stored news:', err);
    return initialNewsItems;
  }
}

export function saveStoredNews(items: NewsItem[]): void {
  try {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    }
    window.dispatchEvent(new CustomEvent('hajiss_news_updated', { detail: items }));
  } catch (err) {
    console.error('Error saving stored news:', err);
  }
}

export function resetStoredNews(): NewsItem[] {
  try {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
    }
    window.dispatchEvent(new CustomEvent('hajiss_news_updated', { detail: [] }));
    return [];
  } catch (err) {
    console.error('Error resetting stored news:', err);
    return [];
  }
}
