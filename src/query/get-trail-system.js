const trailSystems = require('../data/trail-systems.json');
const getParkingLots = require('./get-parking-lots');

module.exports = () => {
  return trailSystems.map(trailSystem => ({
    id: trailSystem.id,
    name: trailSystem.name,
    parkingLots: trailSystem.parkingLotIds.map(id => getParkingLots({id})),
  }));
}