const trailSystems = require('../entity/trailSystems.json');
const parkingLots = require('../entity/parkingLots.json');
const parkingPermits = require('../entity/parkingPermits.json');
const restaurants = require('../entity/restaurants.json');

const getParkingLots = ({id}) => {
  return parkingLots
  .filter(lot => lot.id === id)
  .map(lot => ({
    id: lot.id,
    name: lot.name,
    streetAddress: lot.streetAddress,
    entranceCoordinates: {lat: lot.entranceCoordinates[0], lng: lot.entranceCoordinates[1]},
    parkingPermits: lot.parkingPermitIds && lot.parkingPermitIds.map(id => parkingPermits.find(permit => permit.id === id)),
  }))[0];
}

module.exports = () => {
  return trailSystems.map(trailSystem => ({
    id: trailSystem.id,
    name: trailSystem.name,
    parkingLots: trailSystem.parkingLotIds.map(id => getParkingLots({id})),
    restaurants: trailSystem.restaurantIds && trailSystem.restaurantIds.map(id => restaurants.find(restaurant => restaurant.id === id)),
  }));
}