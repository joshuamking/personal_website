function resetAjaxExampleHtml () {
	$("#ajax_example").html("<li><a id=\"more\" href=\"#\">More</a></li>");

	$("#more").click(function () {
		$.ajax({
			url: "more.html",
			success: function (data) {
				$("#ajax_example").html(data);
				$("#less").click(function () {
					resetAjaxExampleHtml();
				});
			}
		});
	});
}

window.onload = function () {
	$("#on_transfer_show").hide();
	$("#on_credit_show").hide();

	//noinspection JSUnresolvedFunction
	$("[name=payment]").change(function () {
		if (this.value === "credit_card") {
			$("#on_credit_show").show();
			$("#on_transfer_show").hide();
		}
		else if (this.value === "wire_transfer") {
			$("#on_transfer_show").show();
			$("#on_credit_show").hide();
		}
	});
	$(".removable > li").draggable({
		addClasses: false
	});
	$(".trash").droppable({
		drop: function (event, el) {
			$(el.draggable[ 0 ]).hide();
		}
	});

	resetAjaxExampleHtml();
};
