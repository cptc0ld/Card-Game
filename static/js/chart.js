function createChart() {
	var ctx = document.getElementById("myChart").getContext("2d");

	var myChart = new Chart(ctx, {
		type: "doughnut",
		data: {
			labels: ["New", "Mastered", "Reviewing", "Learning"],
			datasets: [
				{
					data: [],
					backgroundColor: [
						"rgb(161, 157, 156)",
						"rgb(80, 237, 28)",
						"rgb(237, 164, 28)",
						"rgb(199, 4, 23)",
					],
					borderColor: [
						"rgb(0,0,0)",
						"rgb(0,0,0)",
						"rgb(0,0,0)",
						"rgb(0,0,0)",
					],
					borderWidth: 1,
				},
			],
		},
		options: {
			maintainAspectRatio: false,
			responsive: true,
			tooltips: {
				callbacks: {
					label: function (tooltipItem, data) {
						var label =
							data.datasets[tooltipItem.datasetIndex].label || "";

						if (label) {
							label += ": ";
						}
						label += Math.round(tooltipItem.yLabel * 100) / 100;
						return label;
					},
				},
			},
		},
	});
	return myChart;
}
