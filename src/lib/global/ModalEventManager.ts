export type HideAll = 'HIDE_ALL';

class EventManager {
  events = new Map<string, (data: boolean) => any>();

  constructor() {
    return this;
  }

  on = (e: string, callBack: (data: boolean) => any) => {
    if (!this.events.has(e)) {
      this.events.set(e, callBack);
    }
    return this;
  };

  off = (e: string) => {
    if (this.events.has(e)) {
      this.events.delete(e);
    }
  };

  emit = (e: string | HideAll, data?: boolean) => {
    if (e === 'HIDE_ALL') {
      this.events.forEach((callBack) => {
        callBack(false);
      });
      return this;
    }
    const callBack = this.events.get(e);
    if (callBack && typeof data !== 'undefined') {
      callBack(data);
    }
    return this;
  };
}

export default new EventManager();
