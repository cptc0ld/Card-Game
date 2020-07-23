const router = require("express").Router();
const fs = require("fs");
const util = require("util");
let userdata;
const { update } = require("../src/db");

router.get("/vocab", async (req, res) => {
	const data = fs.readFileSync(".\\src\\userdata.json", {
		encoding: "utf8",
		flag: "r",
	});
	commonWords = JSON.parse(data);
	res.json(commonWords);
});

router.post("/vocabUpdate", (req, res) => {
	const data = fs.readFileSync(".\\src\\userdata.json", {
		encoding: "utf8",
		flag: "r",
	});
	commonWords = JSON.parse(data);
	let wordIndex = req.body.index;
	let wordName;
	let wordExplanation;
	let currentWordType;
	commonWords.all.forEach((word) => {
		if (word.index == wordIndex) {
			currentWordType = word.type;
			if (currentWordType == "new") {
				if (req.body.type == "mastered") {
					word.type = "mastered";
				} else {
					word.type = "learn";
				}
			}
			if (currentWordType == "learn") {
				if (req.body.type == "mastered") {
					word.type = "review";
				} else {
					word.type = "learn";
				}
			}
			if (currentWordType == "mastered") {
				if (req.body.type == "mastered") {
					word.type = "mastered";
				} else {
					word.type = "learn";
				}
			}
			if (currentWordType == "review") {
				if (req.body.type == "mastered") {
					word.type = "mastered";
				} else {
					word.type = "learn";
				}
			}
			wordType = word.type;
			wordName = word.word;
			wordExplanation = word.explanation;
		}
	});

	console.log(currentWordType, wordType, wordName);

	if (wordType == "learn") {
		commonWords.mastered.forEach((word, i) => {
			if (word.word == wordName) {
				commonWords.mastered.splice(i, 1);
			}
		});
		commonWords.review.forEach((word, i) => {
			if (word.word == wordName) {
				commonWords.review.splice(i, 1);
			}
		});
	}
	if (wordType == "review") {
		commonWords.mastered.forEach((word, i) => {
			if (word.word == wordName) {
				commonWords.mastered.splice(i, 1);
			}
		});
		commonWords.learn.forEach((word, i) => {
			if (word.word == wordName) {
				commonWords.learn.splice(i, 1);
			}
		});
	}
	if (wordType == "mastered") {
		commonWords.learn.forEach((word, i) => {
			if (word.word == wordName) {
				commonWords.learn.splice(i, 1);
			}
		});
		commonWords.review.forEach((word, i) => {
			if (word.word == wordName) {
				commonWords.review.splice(i, 1);
			}
		});
	}

	if (wordType == "mastered" && currentWordType != "mastered") {
		commonWords.mastered.push({
			index: wordIndex,
			word: wordName,
			explanation: wordExplanation,
		});
		update(commonWords);
	}
	if (wordType == "learn" && currentWordType != "learn") {
		commonWords.learn.push({
			index: wordIndex,
			word: wordName,
			explanation: wordExplanation,
		});
		update(commonWords);
	}
	if (wordType == "review" && currentWordType != "review") {
		commonWords.review.push({
			index: wordIndex,
			word: wordName,
			explanation: wordExplanation,
		});
		update(commonWords);
	}

	res.json(commonWords);
});

module.exports = router;
