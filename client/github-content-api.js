export class GithubContentApi {
  constructor({ accessToken, owner, repo, entityPathMap }) {
    this.accessToken = accessToken;
    this.owner = owner;
    this.repo = repo;
    this.entityPathMap = entityPathMap;

    this.urlRoot = 'https://api.github.com';
    this.headerContentType = 'application/json; charset=utf-8';
    this.headerAccept = 'application/json';
    this.headerAuthorization = `token ${this.accessToken}`;
  }

  async create() {
    throw new Error('not implemented');
  }

  async update({ entity, content, sha, message }) {
    const path = this.entityPathMap[entity];
    const endpoint = `${this.urlRoot}/repos/${this.owner}/${this.repo}/contents/${path}`;
    const contentBase64 = btoa(JSON.stringify(content, null, 2));

    const response = await fetch(endpoint, {
      method: 'PUT',
      body: JSON.stringify({
        "message": message,
        "content": contentBase64,
        "sha": sha,
      }),
      headers: {
        Authorization: this.headerAuthorization,
        'Accept': this.headerAccept,
        "Content-Type": this.headerContentType,
      },
    });

    return response.json();
  }

  async delete() {

  }

  async get({ entity }) {
    const path = this.entityPathMap[entity];
    const endpoint = `${this.urlRoot}/repos/${this.owner}/${this.repo}/contents/${path}`;
    const response = await fetch(endpoint, {
      headers: {
        Authorization: this.headerAuthorization,
        'Accept': this.headerAccept,
        "Content-Type": this.headerContentType,
      },
    });

    const { content, sha } = await response.json();
    const contentObj = JSON.parse(atob(content));

    return { content: contentObj, sha };
  }
}