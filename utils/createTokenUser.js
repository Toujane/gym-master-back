const createTokenUser = (user) => {
	return {
		firstName: user.firstName,
		lastName: user.lastName,
		userId: user._id,
	};
};

module.exports = {
	createTokenUser,
};
