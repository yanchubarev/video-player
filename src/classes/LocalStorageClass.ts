export default class LocalStorage {
  static setItem(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  static getItem(key: string) {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  }
}
