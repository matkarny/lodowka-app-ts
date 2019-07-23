import { store, login, logout } from '../store/storeConfigure';

class Authenticator {
  isAuthenticated: boolean = false; // -1 - logged out, >= 0 - logged in
  isAuthorized: boolean = false; // 0 - parent, 1 - child

  authenticate(userId, redirect) {
    this.isAuthenticated = true;
    login(userId);
    redirect();
  }

  authorize(redirect) {
    this.isAuthorized = true;
  }

  signout(redirect) {
    this.isAuthenticated = false;
    this.isAuthorized = false;
    logout();
    redirect();
  }
}

const authenticator = new Authenticator();

export default authenticator;
