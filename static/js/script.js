$(document).ready(function () {
	myChart = createChart();
	getNextCard();
	getCount();
	function getCount() {
		$.ajax({
			url: "/api/vocabcount",
			type: "GET",
			success: function (data) {
				myChart.data.datasets[0].data[0] = data["newcount"];
				myChart.data.datasets[0].data[1] = data["masteredcount"];
				myChart.data.datasets[0].data[2] = data["reviewcount"];
				myChart.data.datasets[0].data[3] = data["learncount"];
				myChart.update();
			},
			error: function (err) {
				console.log("count-error");
			},
		});
	}
	function getNextCard() {
		$(".back-card").fadeOut("slow", function () {
			$.ajax({
				url: "/api/vocab",
				dataType: "json ",
				async: false,
				success: function (data) {
					let index = Math.floor(Math.random() * data.count);
					$(".index").text(index);
					$(".type").text(data["all"][index]["type"]);
					$(".card").text(data["all"][index]["word"]);
					$(".back-card").text(data["all"][index]["explanation"]);
				},
				error: function (err) {
					console.log("error");
				},
			});
		});
	}

	$(".answer").on("click", function () {
		$(".back-card").fadeIn("slow");
	});

	$(".sure").on("click", function () {
		let indexdata = {};
		indexdata.index = $(".index").text();
		indexdata.type = "mastered";
		$.ajax({
			url: "/api/vocabUpdate",
			type: "POST",
			async: false,
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
		getCount();
	});
	$(".not-sure").on("click", function () {
		let indexdata = {};
		indexdata.index = $(".index").text();
		indexdata.type = "learn";
		$.ajax({
			url: "/api/vocabUpdate",
			type: "POST",
			async: false,
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
		getCount();
	});
	$(".show-all").on("click", function () {
		$.ajax({
			url: "/api/indivocab",
			type: "get",
			async: false,
			dataType: "json ",
			success: function (data) {
				let mastered = data["mastered"];
				let review = data["review"];
				let learn = data["learn"];
				let masteredtext = "Mastered: ";
				mastered.forEach((element) => {
					masteredtext += element.word;
					masteredtext += " ";
				});
				let reviewtext = "Review: ";
				review.forEach((element) => {
					reviewtext += element.word;
					reviewtext += " ";
				});
				learntext = "Learn: ";
				learn.forEach((element) => {
					learntext += element.word;
					learntext += " ";
				});
				$(".info").html(
					masteredtext + "<br>" + reviewtext + "<br>" + learntext
				);
				$(".info").fadeIn("slow");
			},
			error: function (err) {
				console.log("error");
			},
		});
	});
	$(".reset").on("click", function () {
		$.ajax({
			url: "/api/vocabreset",
			type: "get",
			async: false,
			dataType: "json ",
			success: function (data) {
				console.log(data);
			},
			error: function (err) {
				console.log("reset-error");
			},
		});
		getNextCard();
		getCount();
	});
});
