export class Storage {
    static setLocal = (key: string, value: any) => {
        localStorage.setItem(key, value);
    }
    static getLocal = (key: string) => {
        return localStorage.getItem(key);
    }
    static removeLocal(key: string) {
        localStorage.removeItem(key);
    }
    static setSession = (key: string, value: any) => {
        sessionStorage.setItem(key, value);
    }
    static getSession = (key: string) => {
        return sessionStorage.getItem(key);
    }
    static removeSession(key: string) {
        sessionStorage.removeItem(key);
    }
  }
  
  