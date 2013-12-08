var toggleHandler = function(toggle) {
	var $toggle = $(toggle);
	var radio = $toggle.find("input"),$img=$toggle.parent().find('.tile-image');

	var checkToggleState = function() {
		if(radio.eq(0).is(":checked")||radio.eq(0).attr("checked")=="checked") {
			$toggle.removeClass("toggle-off");
			$img.removeClass("black");
		} else {
			$toggle.addClass("toggle-off");
			$img.addClass("black");
		}
	};

	checkToggleState();

	radio.click(function() {
		$toggle.toggleClass("toggle-off");
		$img.toggleClass("black");
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