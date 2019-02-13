export class GithubContentService {
  constructor({ accessToken, owner, repo, entityPathMap }) {
    this.accessToken = accessToken;
    this.owner = owner;
    this.repo = repo;
    this.entityPathMap = entityPathMap;

    this.urlRoot = 'https://api.github.com';

    this.headers = {
      Authorization: `token ${this.accessToken}`,
      'Accept': 'application/json',
      "Content-Type": 'application/json; charset=utf-8',
    };
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
      headers: this.headers,
    });

    return response.json();
  }

  async delete() {

  }

  async get({ entity }) {
    const path = this.entityPathMap[entity];
    const endpoint = `${this.urlRoot}/repos/${this.owner}/${this.repo}/contents/${path}`;
    const response = await fetch(endpoint, {
      headers: this.headers,
    });

    const { content, sha } = await response.json();
    const contentObj = JSON.parse(atob(content));

    return { content: contentObj, sha };
  }
}