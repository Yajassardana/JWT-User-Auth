const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();

app.get('/api', (req, res) => {
	res.json({
		//converts its non json arguments to json too before calling res.send || https://medium.com/@punitkmr/use-of-res-json-vs-res-send-vs-res-end-in-express-b50688c0cddf
		message: 'Hello Coder, Welcome to the club',
	});
});

app.post('/api/login', (req, res) => {
	// in generlal, all auth, getting user from data base and checking password would be here
	const user = {
		id: 1,
		username: 'yajas',
		email: 'yajassardana1@gmail.com',
	}; //mock user
	jwt.sign({ user: user }, 'secretKey', (err, token) => {
		//generating the token, senging the user as a payload, a secret key string of choice and getting the token back as callback
		res.json({
			token: token,
		});
	});
});

app.post('/api/posts', verifyToken, (req, res) => {
	//protected route, verifyToken is the middleware
	jwt.verify(req.token, 'secretKey', (err, authData) => {
		if (err) {
			res.sendStatus(403);
		} else {
			res.json({
				message: 'Successfully posted',
				user: authData,
			});
		}
	});
});

//*FORMAT OF AUTH TOKENS-
//*Authorisation : Bearer <access_token>

//verify token
function verifyToken(req, res, next) {
	//Get auth header value
	const bearerHeader = req.headers['authorization']; // get the value of the header having field as authorizasion
	//Check if bearer is undefined
	if (typeof bearerHeader !== 'undefined') {
		// *splits the string into a array with making substrings whenever a space is encountered
		const bearer = bearerHeader.split(' ');
		// retrieving the token from the split array
		const bearerToken = bearer[1];

		req.token = bearerToken; //creating a key value pair in the req object to save the bearer token
		next();
	} else {
		res.sendStatus(403); //! 403 means forbidden
	}
}

app.listen(5000, () => {
	console.log('protected server running on port 5000');
});
