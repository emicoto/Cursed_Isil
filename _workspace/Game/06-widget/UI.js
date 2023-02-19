Ui.replace = function (label, html) {
	new Wikifier(null, `<<replace #${label}>>${html}<</replace>>`);
};

Ui.showhtml = function (tag, menu) {
	if (menu.length) {
		$(`#${tag}`).removeClass("hidden");
		Ui.replace(tag, menu.join(""));
	} else {
		$(`#${tag}`).addClass("hidden");
	}
};
