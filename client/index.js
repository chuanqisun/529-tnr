import { DataService } from './data-service.js';

document.getElementById('add-restaurant').onclick = async () => {
  const accessToken = sessionStorage.getItem('access_token');

  if (accessToken) {
    const dataService = new DataService({ accessToken });
    const result = await dataService.addRestaurant({
      id: Math.random().toString(),
      rating: 99,
    });

    console.dir(result);

    // const restaurantsResponse = await fetch('https://api.github.com/repos/chuanqisun/529-legion-hub/contents/client/data/restaurant.json', {
    //   headers: {
    //     Authorization: `token ${accessToken}`,
    //     'Accept': 'application/json',
    //     "Content-Type": 'application/json; charset=utf-8'
    //   }
    // });

    // const restaurantsFile = await restaurantsResponse.json();
    // console.dir(restaurantsFile);
    // const { sha, content } = restaurantsFile;

    // const originalObject = JSON.parse(atob(content));
    // originalObject.push({
    //   name: 'some name',
    //   id: Math.random()
    // });

    // const payload = btoa(JSON.stringify(originalObject, null, 2));

    // const updateResponse = await fetch('https://api.github.com/repos/chuanqisun/529-legion-hub/contents/client/data/restaurant.json', {
    //   method: 'PUT',
    //   body: JSON.stringify({
    //     "message": "Add restaurant through API",
    //     "content": payload,
    //     "sha": sha
    //   }),
    //   headers: {
    //     Authorization: `token ${accessToken}`,
    //     'Accept': 'application/json',
    //     "Content-Type": 'application/json; charset=utf-8'
    //   }
    // });
  } else {
    window.open('./index.html');
  }
}