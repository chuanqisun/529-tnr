import { userService } from './services/user.service.js';
import { contentService } from './services/content.service.js';

class App {
  constructor({ userService, contentService }) {
    this.userService = userService;
    this.contentService = contentService;

    document.getElementById('sign-in').onclick = async () => {
      document.getElementById('sign-in').disabled = true;
      this.userService.signIn();
    };

    document.getElementById('sign-out').onclick = async () => {
      this.userService.signOut();
    };

    document.getElementById('add-restaurant').onclick = async () => {
      const accessToken = sessionStorage.getItem('access_token');

      if (accessToken) {
        const result = await this.contentService.addRestaurant({
          name: 'Pomo',
        });

        console.dir(result);
      } else {
        window.open('./index.html');
      }
    }

    this.userService.getAuthenticatedUser().then(user => {
      if (user) {
        document.getElementById('sign-out').hidden = false;
        document.getElementById('sign-out').innerText = `${user.name} (sign out)`;
      } else {
        document.getElementById('sign-in').hidden = false;
      }
    });
  }
}

new App({ userService, contentService });





