const fs = require("fs");
const { pathToFileURL } = require("url");
const path = require("path");
const update = function updatedb(data) {
	fs.writeFile(
		path.join(__dirname, "userdata.json"),
		JSON.stringify(data),
		(err, data) => {
			if (err) throw err;
		}
	);
};

module.exports = { update };
