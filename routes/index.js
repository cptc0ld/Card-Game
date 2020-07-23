const router = require("express").Router();
const { commonWords } = require("../Model/Vocabulary");

router.get("/", (req, res) => {
	res.render("pages/index");
});

module.exports = router;
