import { Injectable } from '@angular/core';
import { UserRole } from '@app/shared';

export interface IUserData {
  role?: UserRole;
}

class UserData implements IUserData {
  role: UserRole;
}

@Injectable({
  providedIn: 'root'
})
export class SessionStorageService {

  constructor() { }

  private userData: UserData = {
    role: null
  };

  setItem(key, item) {
    sessionStorage.setItem(key, item);
  }

  getUserData(sessionStorageKey): IUserData {
    const sessionItem = sessionStorage.getItem(sessionStorageKey);
    if (sessionItem !== null) {
      this.userData.role = sessionItem ? UserRole[sessionItem] : null;
    }
    return this.userData
  }
}