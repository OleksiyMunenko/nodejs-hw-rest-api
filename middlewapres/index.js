const {validateBody, validateStatusBody} = require("./validateBody");
const isValidId = require("./isValidId");
const authenticate = require("./authenticate");
const upload = require("./upload");

module.exports = {
	validateBody,
	validateStatusBody,
	isValidId,
	authenticate,
	upload,
};