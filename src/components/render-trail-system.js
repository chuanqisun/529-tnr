module.exports = ({trailSystems}) => `
<ul>
${trailSystems.map(trailSystem => 
  `<li>
    <h2>${trailSystem.name}</h2>
    <ul>
      ${trailSystem.parkingLots.map(lot => {
        const [lat, lng] = lot.entranceCoordinates;
        return `
        <li>
          <h3><a href="https://www.google.com/maps/search/?api=1&query=${lat},${lng}" target="_blank">${lot.name}</a></h3>
          ${lot.parkingPermits ? `<small>requires ${lot.parkingPermits.map(permit => permit.name).join('')}</small>` : ''}
        </li>
      `}).join('')}
    </ul>
  </li>
  `
).join('')}
</ul>
`;