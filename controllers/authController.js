const User = require('../models/User');
const CustomError = require('../errors');
const { attachCookiesToResponse, createTokenUser } = require('../utils');
const { StatusCodes } = require('http-status-codes');

const register = async (req, res) => {
	const { firstName, lastName, email, password, phone } = req.body;

	const emailAlreadyExists = await User.findOne({ email });
	if (emailAlreadyExists) {
		throw new CustomError.BadRequestError('Email already exists');
	}

	const user = await User.create({ firstName, lastName, email, password, phone });
	const tokenUser = createTokenUser(user);
	attachCookiesToResponse({ res, user: tokenUser });
	res.status(StatusCodes.OK).json({
		success: true,
		message: 'Successful register!',
		data: {
			user: tokenUser,
		},
	});
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
	const tokenUser = createTokenUser(user);
	attachCookiesToResponse({ res, user: tokenUser });

	res.status(StatusCodes.OK).json({
		success: true,
		message: 'Successful login!',
		data: {
			user: tokenUser,
		},
	});
};
const logout = async (req, res) => {
	res.cookie('token', 'logout', {
		httpOnly: true,
		expires: new Date(Date.now() + 1000),
	});
	res.status(StatusCodes.OK).json({
		success: true,
		message: 'Successful logout!',
		data: {},
	});
};

module.exports = {
	register,
	login,
	logout,
};
