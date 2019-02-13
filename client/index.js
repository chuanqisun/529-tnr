class App {
  constructor() {
    this.userManager = document.querySelector('mtb-user-manager');
    this.contentManager = document.querySelector('mtb-content-manager');

    document.getElementById('sign-in').onclick = async () => {
      this.userManager.signIn()
    };

    document.getElementById('sign-out').onclick = async () => {
      this.userManager.signOut()
    };

    document.getElementById('add-restaurant').onclick = async () => {
      const accessToken = sessionStorage.getItem('access_token');

      if (accessToken) {
        const result = await this.contentManager.addRestaurant({
          name: 'Pomo',
        });

        console.dir(result);
      } else {
        window.open('./index.html');
      }
    }

    this.userManager.getAuthenticatedUser().then(user => console.dir(user));
  }
}

new App();





