const getTrailSystems = require('../query/get-trail-system');
const renderTrailSystems = require('../components/render-trail-system');

module.exports = () => `
<h1>Trail systems</h1>
${renderTrailSystems({trailSystems: getTrailSystems()})}
`;