import { DataService } from './data-service.js';

document.getElementById('add-restaurant').onclick = async () => {
  const accessToken = sessionStorage.getItem('access_token');

  if (accessToken) {
    const dataService = new DataService({ accessToken });
    const result = await dataService.addRestaurant({
      name: 'Pomo',
    });

    console.dir(result);
  } else {
    window.open('./index.html');
  }
}