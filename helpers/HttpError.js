const errorMessageList = {
	400: "Bad Request",
	401: "Not authorized",
	404: "Not found",
	409: "conflict",
};

const HttpError = (status, messsage = errorMessageList[status]) => {
	const error = new Error (messsage);
	error.status = status;
	return error;
}

module.exports = HttpError;