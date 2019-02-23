const trailSystems = require('../entity/trailSystems.json');
const trailPermits = require('../entity/trailPermits.json');
const parkingLots = require('../entity/parkingLots.json');
const parkingPermits = require('../entity/parkingPermits.json');

const getParkingLots = ({ id }) => {
  return parkingLots
    .filter(lot => lot.id === id)
    .map(lot => ({
      id: lot.id,
      name: lot.name,
      streetAddress: lot.streetAddress,
      parkingPermit: lot.parkingPermitId !== undefined && parkingPermits.find(permit => permit.id === lot.parkingPermitId),
      googleMapsUrl: `https://www.google.com/maps/search/?api=1&query=${lot.entranceCoordinates[0]},${lot.entranceCoordinates[1]}`
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

const getRestaurant = ({id}) => {
  const restaurants = require('../entity/restaurants.json');

  const matchingRestaurant = restaurants.find(restaurant => restaurant.id === id);
  return {
    ...matchingRestaurant,
    googleMapsUrl: `https://www.google.com/maps/search/?api=1&query=${matchingRestaurant.coordinates[0]},${matchingRestaurant.coordinates[1]}`
  }
}

module.exports = async () => {
  const weatherAtTrailSystems = await getWeather();

  return trailSystems.map(trailSystem => ({
    id: trailSystem.id,
    name: trailSystem.name,
    parkingLots: trailSystem.parkingLotIds.map(id => getParkingLots({ id })),
    restaurants: trailSystem.restaurantIds && trailSystem.restaurantIds.map(id => getRestaurant({id})),
    weather: weatherAtTrailSystems.find(item => item.trailSystemId === trailSystem.id).weather,
    trailPermit: trailPermits.find(permit => permit.id === trailSystem.trailPermitId),
  })).sort((a, b) => a.name.localeCompare(b.name));
}