import { contentService } from './services/content.service.js';

class Sponsors {
  constructor() {
    this.init();
  }

  async init() {
    const sponsors = await contentService.getSponsors();

    document.getElementById('sponsor-list').innerHTML = `
      ${sponsors.map(sponsor => `<li><a href="${sponsor.website}" target="_blank">${sponsor.name}</a></li>`).join('')}
    `.trim();

    document.getElementById('instragram_tags').value = sponsors.reduce((result, sponsor) => [...result, ...sponsor.instagram_tags.map(tag => `#${tag}`)], []).join('');
  }
}

new Sponsors();