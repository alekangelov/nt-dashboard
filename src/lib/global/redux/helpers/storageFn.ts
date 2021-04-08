function ChromeStorage() {
  const storage = chrome.storage.sync;
  return {
    getItem: (key: string): Promise<string> => {
      return new Promise((resolve) => {
        storage.get(key, (result) => {
          resolve(result[key]);
        });
      });
    },
    setItem: (key: string, item: string): Promise<void> => {
      return new Promise((resolve) => {
        storage.set({ [key]: item }, () => {
          resolve();
        });
      });
    },
    removeItem: (key: string): Promise<void> => {
      return new Promise((resolve) => {
        storage.remove(key, function () {
          resolve();
        });
      });
    },
  };
}

function LocalStorage() {
  return {
    getItem: (key: string): Promise<string> => {
      return new Promise((resolve) => {
        resolve(localStorage.getItem(key) || '');
      });
    },
    setItem: (key: string, item: string): Promise<void> => {
      return new Promise((resolve) => {
        resolve(localStorage.setItem(key, item));
      });
    },
    removeItem: (key: string): Promise<void> => {
      return new Promise((resolve) => {
        resolve(localStorage.removeItem(key));
      });
    },
  };
}

const storageFn = () => {
  if (chrome?.storage?.sync) {
    return ChromeStorage();
  }
  return LocalStorage();
};

export default storageFn();
