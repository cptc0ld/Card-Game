const router = require("express").Router();
const { commonWords } = require("../Model/Vocabulary");

router.get("/", (req, res) => {
	res.render("home");
});

router.get("/game", (req, res) => {
	res.render("index");
});

module.exports = router;
