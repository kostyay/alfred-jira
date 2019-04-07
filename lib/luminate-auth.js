const request = require('axios');

const TARGET_URL = process.env.LUMINATE_API_ENDPOINT
const CLIENT_KEY = process.env.LUMINATE_CLIENT_ID
const CLIENT_SECRET = process.env.LUMIANTE_CLIENT_SECRET

function getToken() {
	if (!TARGET_URL || !CLIENT_KEY || !CLIENT_SECRET) {
		console.warn("One of Luminate ENV vars is missing");
		return null;
	}

	let credentials = Buffer.from(`${CLIENT_KEY}:${CLIENT_SECRET}`).toString('base64');

	return request.post(TARGET_URL, {}, {
	    headers: {
	      'Content-Type': 'application/json',
	      'Authorization': `Basic ${credentials}`,
	    },
	  }).then((res) => {
	  	if (res.status != 200) {
	  		return null;
	  	}

	    return res.data.access_token;
	  }).catch((err) => 
	  	console.error(`Failed to get luminate token: ${err}`)
	  );
}

module.exports = { getToken };