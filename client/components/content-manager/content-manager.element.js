class ContentManager extends HTMLElement {
  async connectedCallback() {
    this.userManager = document.querySelector('mtb-user-manager');
    const accessToken = await this.userManager.getAccessToken();

    this.githubContentApi = new GithubContentService({
      accessToken,
      owner: 'chuanqisun',
      repo: '529-legion-hub',
      entityPathMap: {
        ParkingLot: 'client/data/parking-lot.json',
        Restaurant: 'client/data/restaurant.json',
        Sponsor: 'client/data/sponsor.json',
        TrailSystem: 'client/data/trail-system.json',
      },
    });
  }

  async addRestaurant({ name }) {
    const { content, sha } = await this.githubContentApi.get({ entity: 'Restaurant' });
    const newId = content.length > 0 ? content[content.length - 1].id + 1 : 0;
    content.push({ id: newId, name });

    const { content: contentNew, commit } = await this.githubContentApi.update({
      entity: 'Restaurant',
      message: 'Add restaurant',
      content,
      sha,
    });

    return { content: contentNew, commit };
  }
}

customElements.define('mtb-content-manager', ContentManager);

class GithubContentService {
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