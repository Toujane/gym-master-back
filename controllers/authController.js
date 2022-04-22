const User = require('../models/User');
const CustomError = require('../errors');
//const { attachCookiesToResponse, createTokenUser } = require('../utils');

const register = async (req, res) => {
	const { email, name, password } = req.body;

	const emailAlreadyExists = await User.findOne({ email });
	if (emailAlreadyExists) {
		throw new CustomError.BadRequestError('Email already exists');
	}

	const isFirstAccount = (await User.countDocuments({})) === 0;
	const role = isFirstAccount ? 'admin' : 'user';

	const user = await User.create({ name, email, password, role });
	const tokenUser = createTokenUser(user);
	attachCookiesToResponse({ res, user: tokenUser });
	res.status(200).json({ user: tokenUser });
};
const login = async (req, res) => {
	const { email, password } = req.body;

	if (!email || !password) {
		throw new CustomError.BadRequestError('Please provide email and password');
	}
	const user = await User.findOne({ email });

	if (!user) {
		throw new CustomError.BadRequestError('Invalid Credentials');
	}
	const isPasswordCorrect = await user.comparePassword(password);
	if (!isPasswordCorrect) {
		throw new CustomError.BadRequestError('Invalid Credentials');
	}
	//const tokenUser = createTokenUser(user);
	//attachCookiesToResponse({ res, user: tokenUser });

	res.status(200).json({ user: 'blah-blah' });
};
const logout = async (req, res) => {
	res.cookie('token', 'logout', {
		httpOnly: true,
		expires: new Date(Date.now() + 1000),
	});
	res.status(200).json({ msg: 'user logged out!' });
};

const test = async (req, res) => {
	res.status(200).json({ msg: 'Route is Up!' });
};

module.exports = {
	register,
	login,
	logout,
	test,
};
