const jwt = require('jsonwebtoken');
const config = require('../config');

const createJWT = ({ payload }) => {
	const token = jwt.sign(payload, config.JWT_SECRET_KEY, {
		expiresIn: config.JWT_LIFETIME,
	});
	return token;
};

const isTokenValid = ({ token }) => jwt.verify(token, config.JWT_SECRET_KEY);

const attachCookiesToResponse = ({ res, user }) => {
	const token = createJWT({ payload: user });

	const oneDay = 1000 * 60 * 60 * 24;

	res.cookie('token', token, {
		httpOnly: true,
		expires: new Date(Date.now() + oneDay),
		secure: process.env.NODE_ENV === 'production',
		signed: true,
	});
};

module.exports = {
	createJWT,
	isTokenValid,
	attachCookiesToResponse,
};
