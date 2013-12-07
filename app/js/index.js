var toggleHandler = function(toggle) {
	var toggle = toggle;
	var radio = $(toggle).find("input");

	var checkToggleState = function() {
		if(radio.eq(0).is(":checked")||radio.eq(0).attr("checked")=="checked") {
			$(toggle).removeClass("toggle-off");
		} else {
			$(toggle).addClass("toggle-off");
		}
	};

	checkToggleState();

	radio.eq(0).click(function() {
		$(toggle).toggleClass("toggle-off");
	});

	radio.eq(1).click(function() {
		$(toggle).toggleClass("toggle-off");
	});
};

$(document).ready(function() {
	$(".toggle").each(function(index, toggle) {
		var radio = $(toggle).find("input");
		var label = $(toggle).find("label");
		radio.eq(0).attr('id', 'toggleOption' + index + "_1");
		label.eq(1).attr('for', 'toggleOption' + index + "_1");
		radio.eq(1).attr('id', 'toggleOption' + index + "_2");
		label.eq(0).attr('for', 'toggleOption' + index + "_2");
		toggleHandler(toggle);
	});
}); 