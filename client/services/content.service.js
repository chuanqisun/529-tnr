import { userService } from './user.service.js';

class ContentService {
  constructor({ userService }) {
    this.userService = userService;

    this.accessToken = this.userService.accessToken;
    this.owner = 'chuanqisun';
    this.repo = '529-legion-hub';
    this.entityPathMap = {
      ParkingLot: 'client/data/parking-lot.json',
      Restaurant: 'client/data/restaurant.json',
      Sponsor: 'client/data/sponsor.json',
      TrailSystem: 'client/data/trail-system.json',
    };

    this.urlRoot = 'https://api.github.com';

    this.headers = {
      Authorization: `token ${this.accessToken}`,
      'Accept': 'application/json',
      "Content-Type": 'application/json; charset=utf-8',
    };
  }

  async addRestaurant({ name }) {
    const { content, sha } = await this._get({ entity: 'Restaurant' });
    const newId = content.length > 0 ? content[content.length - 1].id + 1 : 0;
    content.push({ id: newId, name });

    const { content: contentNew, commit } = await this._update({
      entity: 'Restaurant',
      message: 'Add restaurant',
      content,
      sha,
    });

    return { content: contentNew, commit };
  }

  async _create() {
    throw new Error('not implemented');
  }

  async _update({ entity, content, sha, message }) {
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

  async _delete() {
    throw new Error('not implemented');
  }

  async _get({ entity }) {
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

export const contentService = new ContentService({ userService });