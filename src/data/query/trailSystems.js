const trailSystems = require('../entity/trailSystems.json');
const parkingLots = require('../entity/parkingLots.json');
const parkingPermits = require('../entity/parkingPermits.json');
const restaurants = require('../entity/restaurants.json');

const getParkingLots = ({ id }) => {
  return parkingLots
    .filter(lot => lot.id === id)
    .map(lot => ({
      id: lot.id,
      name: lot.name,
      streetAddress: lot.streetAddress,
      entranceCoordinates: { lat: lot.entranceCoordinates[0], lng: lot.entranceCoordinates[1] },
      parkingPermits: lot.parkingPermitIds && lot.parkingPermitIds.map(id => parkingPermits.find(permit => permit.id === id)),
    }))[0];
}

const getWeather = async () => {
  // const weatherPromises = trailSystems.map(trailSystem => getWeatherByCoordinates({lat: trailSystem.centerCoordinates[0], lng: trailSystem.centerCoordinates[1]}));
  // const weatherArray = await Promise.all(weatherPromises);
  const weatherArray = require('./weather-array.mock.json');

  const weatherAtTrailSystems = weatherArray.map((data, index) => ({
    trailSystemId: trailSystems[index].id,
    weather: data,
  }));

  return weatherAtTrailSystems;
}

const getWeatherByCoordinates = async ({ lat, lng }) => {
  const https = require('https');
  const apiKeys = require('../../../api-keys.json');
  const darkSkyApiSecret = apiKeys.darkSky.secretKey

  return new Promise((resolve, reject) => {
    https.get(`https://api.darksky.net/forecast/${darkSkyApiSecret}/${lat},${lng}`, response => {
      let body = '';

      response.on('data', chunk => {
        body += chunk;
      });

      response.on('end', () => {
        const result = JSON.parse(body);
        resolve(result);
      });
    }).on('error', error => {
      reject(error);
    });
  });
}

module.exports = async () => {
  const weatherAtTrailSystems = await getWeather();

  return trailSystems.map(trailSystem => ({
    id: trailSystem.id,
    name: trailSystem.name,
    parkingLots: trailSystem.parkingLotIds.map(id => getParkingLots({ id })),
    restaurants: trailSystem.restaurantIds && trailSystem.restaurantIds.map(id => restaurants.find(restaurant => restaurant.id === id)),
    weather: weatherAtTrailSystems.find(item => item.trailSystemId === trailSystem.id).weather,
  })).sort((a, b) => a.name.localeCompare(b.name));
}