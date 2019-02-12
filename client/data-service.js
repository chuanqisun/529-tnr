import { GithubContentApi } from './github-content-api.js';


export class DataService {
  constructor({ accessToken }) {
    this.githubContentApi = new GithubContentApi({
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