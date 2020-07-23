$(document).ready(function () {
	getNextCard();
	function getNextCard() {
		$.ajax({
			url: "/api/vocab",
			dataType: "json ",
			success: function (data) {
				let index = Math.floor(Math.random() * data.count);
				$(".index").text(index);
				$(".card").text(data["all"][index]["word"]);
				$(".back-card").text(data["all"][index]["explanation"]);
				$(".back-card").css("display", "none");
			},
			error: function (err) {
				console.log("error");
			},
		});
	}

	$(".next-card").on("click", function () {
		getNextCard();
	});

	$(".answer").on("click", function () {
		$(".back-card").css("display", "block");
	});

	$(".sure").on("click", function () {
		let indexdata = {};
		indexdata.index = $(".index").text();
		indexdata.type = "mastered";
		$.ajax({
			url: "/api/vocabUpdate",
			type: "POST",
			data: indexdata,
			dataType: "json ",
			success: function (data) {
				console.log(data);
			},
			error: function (err) {
				console.log("sure - error");
			},
		});
		getNextCard();
	});
	$(".not-sure").on("click", function () {
		let indexdata = {};
		indexdata.index = $(".index").text();
		indexdata.type = "learn";
		$.ajax({
			url: "/api/vocabUpdate",
			type: "POST",
			data: indexdata,
			dataType: "json ",
			success: function (data) {
				console.log(data);
			},
			error: function (err) {
				console.log("error");
			},
		});
		getNextCard();
	});
});
