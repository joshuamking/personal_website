function validate (form) {
	var idIsValid        = $("[name=id]").val().length > 0;
	var firstNameIsValid = $("[name=first_name]").val().length > 0;
	var lastNameIsValid  = $("[name=last_name]").val().length > 0;

	var errorForId        = $("#forId.error");
	var errorForFirstName = $("#forFirstName.error");
	var errorForLastName  = $("#forLastName.error");

	errorForId.hide();
	errorForFirstName.hide();
	errorForLastName.hide();

	var formIsValid = idIsValid && firstNameIsValid && lastNameIsValid;
	if (!formIsValid) {
		if (!idIsValid) {
			errorForId.show();
		}
		if (!firstNameIsValid) {
			errorForFirstName.show();
		}
		if (!lastNameIsValid) {
			errorForLastName.show();
		}

		return;
	}

	var outputHtml = $("#form_to_validate")
		.serializeArray()
		.map(function (el) {
			switch (el.name) {
				case "id":
					return "UserID: " + el.value;
				case "first_name":
					return "First Name: " + el.value;
				case "last_name":
					return "Last Name: " + el.value;
			}
		})
		.join("<br>");
	$("#form_data").html(outputHtml);
	$("#form_to_validate")
		.serializeArray()
		.forEach(function (el) {
			$("[name=" + el.name + "]").val("");
		});
}

window.onload = function () {

//	$("#total_pay").text("Total: $" + totalPay + ".00");
};