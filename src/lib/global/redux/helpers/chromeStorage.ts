function ChromeStorage() {
  return {
    getItem: (key: string): Promise<string> => {
      return new Promise((resolve, reject) => {
        resolve(localStorage.getItem(key) as string);
      });
    },
    setItem: (key: string, item: string): Promise<void> => {
      return new Promise((resolve, reject) => {
        resolve(localStorage.setItem(key, item));
      });
    },
    removeItem: (key: string): Promise<void> => {
      return new Promise((resolve, reject) => {
        resolve(localStorage.removeItem(key));
      });
    },
  };
}

export default ChromeStorage;
