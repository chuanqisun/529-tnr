import { GithubContentService } from '../services/github-content.service.js';

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