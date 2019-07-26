class Authenticator {
  isAuthenticated: boolean = false;
  isAuthorized: boolean = false;

  authenticate(redirect) {
    this.isAuthenticated = true;
    redirect();
  }

  authorize(redirect) {
    this.isAuthorized = true;
  }

  signout(redirect) {
    this.isAuthenticated = false;
    this.isAuthorized = false;
    redirect();
  }
}

const authenticator = new Authenticator();

export default authenticator;
