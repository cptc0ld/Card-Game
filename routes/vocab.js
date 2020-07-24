const router = require("express").Router();
const fs = require("fs");
const { update } = require("../src/db");

router.get("/vocab", (req, res) => {
	const data = fs.readFileSync(".\\src\\userdata.json", {
		encoding: "utf8",
		flag: "r",
	});
	let commonWords = JSON.parse(data);
	res.json(commonWords);
});

router.post("/vocabUpdate", (req, res) => {
	const data = fs.readFileSync(".\\src\\userdata.json", {
		encoding: "utf8",
		flag: "r",
	});
	let commonWords = JSON.parse(data);
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

router.get("/vocabcount", (req, res) => {
	const data = fs.readFileSync(".\\src\\userdata.json", {
		encoding: "utf8",
		flag: "r",
	});
	let commonWords = JSON.parse(data);
	res.json({
		newcount:
			commonWords.count -
			commonWords.mastered.length -
			commonWords.learn.length -
			commonWords.review.length,
		masteredcount: commonWords.mastered.length,
		learncount: commonWords.learn.length,
		reviewcount: commonWords.review.length,
	});
});

router.get("/vocabreset", (req, res) => {
	const data = fs.readFileSync(".\\data\\data.json", {
		encoding: "utf8",
		flag: "r",
	});
	fs.writeFile(".\\src\\userdata.json", data, (err, data) => {
		if (err) throw err;
	});
	res.json({
		code: 0,
	});
});

router.get("/indivocab", (req, res) => {
	const data = fs.readFileSync(".\\src\\userdata.json", {
		encoding: "utf8",
		flag: "r",
	});
	let commonWords = JSON.parse(data);
	console.log(commonWords);
	res.json({
		mastered: commonWords.mastered,
		review: commonWords.review,
		learn: commonWords.learn,
	});
});
module.exports = router;
