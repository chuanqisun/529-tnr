const EMAIL_FOLDER_ID = '1vEI6XEdd_8ryebe8ZZdOx4DHYNMe0dwd';
const RECENCY_LIMIT = 10;

const {google} = require('googleapis');



module.exports = async () => {
  let credentials = {};
  if (process.env.GOOGLEAPI_CLIENT_EMAIL && process.env.GOOGLEAPI_PRIVATE_KEY) {
    console.log('process.env.GOOGLEAPI_CLIENT_EMAIL and GOOGLEAPI_PRIVATE_KEY exists, query API');
    const reconstructedKey = process.env.GOOGLEAPI_PRIVATE_KEY.replace(/\\n/gi, '\n');

    credentials = {
      client_email: process.env.GOOGLEAPI_CLIENT_EMAIL,
      private_key: reconstructedKey,
    }
  } else {
    console.log('process.env.GOOGLEAPI_CLIENT_EMAIL and GOOGLEAPI_PRIVATE_KEY does not exists, use test-api-keys.json');
    credentials = {
      client_email: require('../../../test-api-keys.json').googleApi.client_email,
      private_key: require('../../../test-api-keys.json').googleApi.private_key,
    }
  }

  const auth = await google.auth.getClient({
    credentials,
    scopes: ['https://www.googleapis.com/auth/drive'],
  });

  await auth.authorize();

  const drive = google.drive({
    version: 'v3',
    auth,
  });

  const content = await drive.files.list({
    orderBy: 'name desc',
    pageSize: RECENCY_LIMIT,
    q: `'${EMAIL_FOLDER_ID}' in parents`,
  });

  const itemPromises = content.data.files.map(item => drive.files.get({
    fileId: item.id,
    alt: 'media',
  }));

  const items = await Promise.all(itemPromises);
  const itemsData = items.map(item => {

    // This item.data interface is defined in the Flow

    const oneDay = 24*60*60*1000; // hours*minutes*seconds*milliseconds
    const nowDate = new Date();
    const thenDate = new Date(item.data.time);
    const diffDays = Math.round(Math.abs((nowDate.getTime() - thenDate.getTime())/(oneDay)));
    let friendlyTime = 'today';
    if (diffDays > 1) {
      friendlyTime = `${diffDays} days ago`;
    } else if (diffDays > 0) {
      friendlyTime = `yesterday`;
    }

    return {
      body: item.data.body,
      subject: item.data.subject,
      time: friendlyTime,
    };
  });

  return itemsData;
}