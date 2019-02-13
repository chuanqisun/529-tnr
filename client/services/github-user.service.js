export class GithubUserService {
  constructor({ clientId, redirectUri, scope, authenticationEndpoint }) {
    this.clientId = clientId;
    this.redirectUri = redirectUri;
    this.scope = scope;
    this.authenticationEndpoint = authenticationEndpoint;
    this.storageKeyForAuthorizationCodeData = 'github_authorization_code_data';
    this.storageKeyForAccessToken = 'github_access_token';
  }

  async getAuthenticatedUser() {
    const accessToken = localStorage.getItem(this.storageKeyForAccessToken);
    if (!accessToken) return null;

    const headers = {
      Authorization: `token ${accessToken}`,
      'Accept': 'application/json',
      "Content-Type": 'application/json; charset=utf-8',
    };

    try {
      const response = await fetch('https://api.github.com/user', {
        headers,
      });

      return await response.json();
    } catch (error) {
      /* assume the token is invalid */
      localStorage.removeItem(this.storageKeyForAccessToken);
      return null;
    }
  }

  async signIn() {
    const clientState = Math.random().toString();

    window.open(`https://github.com/login/oauth/authorize?client_id=${this.clientId}&redirect_uri=${this.redirectUri}&state=${clientState}&scope=${this.scope}`);

    const authorizationCode = await this._waitForAuthorizationCode({ clientState });

    const result = await fetch(`${this.authenticationEndpoint}?code=${authorizationCode}`);
    const resultJson = await result.json();
    const accessToken = resultJson.access_token;

    localStorage.setItem(this.storageKeyForAccessToken, accessToken);
  }

  async signOut() {
    localStorage.removeItem(this.storageKeyForAccessToken);
  }

  async _waitForAuthorizationCode({ clientState }) {
    return new Promise((resolve, reject) => {
      let storageEventHandler; storageEventHandler;

      window.addEventListener('storage', storageEventHandler = event => {
        if (event.key === this.storageKeyForAuthorizationCodeData) {
          const { code, state } = JSON.parse(event.newValue);
          window.removeEventListener('storage', storageEventHandler);
          window.localStorage.removeItem(this.storageKeyForAuthorizationCodeData);
          if (state !== clientState) {
            reject('STATE_MISMATCH');
          } else {
            resolve(code);
          }
        }
      });
    });
  }

}