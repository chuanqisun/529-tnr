import { GithubUserService } from '../services/github-user.service.js';

class UserManager extends HTMLElement {
  constructor() {
    super();

    this.githubUserService = new GithubUserService({
      clientId: '93bc6d6286ff1f8d864c',
      redirectUri: 'http://localhost:5500/client/oauth2-callback.html',
      authenticationEndpoint: 'https://wt-9acbe4e672a011d1f00cc517028e7bb1-0.sandbox.auth0-extend.com/github-oauth2',
      scope: 'repo',
    });
  }

  async signIn() {
    return this.githubUserService.signIn();
  }

  async signOut() {
    return this.githubUserService.signOut();
  }

  async getAuthenticatedUser() {
    return this.githubUserService.getAuthenticatedUser();
  }

  async getAccessToken() {
    return localStorage.getItem('github_access_token');
  }
}

customElements.define('mtb-user-manager', UserManager);