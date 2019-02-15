const parkingLots = require('../data/parking-lots.json');
const parkingPermits = require('../data/parking-permits.json');

module.exports = ({id}) => {
  return parkingLots
  .filter(lot => lot.id === id)
  .map(lot => ({
    id: lot.id,
    name: lot.name,
    streetAddress: lot.streetAddress,
    entranceCoordinates: lot.entranceCoordinates,
    parkingPermits: lot.parkingPermitIds && lot.parkingPermitIds.map(id => parkingPermits.find(permit => permit.id === id)),
  }))[0];
}
