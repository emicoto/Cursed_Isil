/**
 *
 * @param {string} text
 */
P.convertSelection = function (text) {
	let replace = text.includes("@replace");
	let txt, html;

	if (replace) {
		txt = text.match(/#:select@replace:(.+):#/);
	} else {
		txt = text.match(/#:select:(.+):#/);
	}

	let pick = txt[1].split("|");
	let selection = "";
	pick.forEach((v) => {
		let t = `<<pick`;
		let content = "";
		let check = v.split(",");

		check.forEach((k) => {
			if (k == "auto") t += ` auto`;
			else if (k.match(/%(.+)%/)) content = k.match(/%(.+)%/)[1];
			else if (parseInt(k)) t += ` ${k}`;
			else t += ` '${k}'`;
		});
		t += ">>" + content;
		selection += t;
	});

	if (replace) {
		html = `<br><<selection replace>>${selection}<</selection>>`;
	} else {
		html = `<br><<selection event>>${selection}<</selection>>`;
	}
	return text.replace(txt[0], html);
};

P.convertTips = function (text) {
	let txt = text.match(/:tips:(.+)\|(.+):/);
	return text.replace(txt[0], `<<tips '${txt[1]}' '${txt[2]}'>>`);
};

/**
 *
 * @param {string | string[]} text
 */
P.txt = function (text) {
	const trans = function (t) {
		if (t.includes(":tips:")) t = P.convertTips(t);
		if (t.includes(":select:")) t = P.convertSelection(t);
		if (t.includes("/L")) t = t.replace("/L", "<br>");

		if (t.includes("<fr>")) {
			t = t.replace("<fr>", "<br>");
		} else if (t.includes("/* */")) {
			t = t.replace("/* */", "");
		}
		//清理注释
		else if (t.match(/\/\*(.+)\*\//)) {
			t = t.replace(/\/\*(.+)\*\//, "");
		} else {
			if (
				t.has(
					"if",
					"switch",
					"case",
					"<</",
					"select",
					"<br>",
					"replace",
					"div",
					"<<pick",
					"<<event",
					"<<run",
					"<<set"
				) === false
			) {
				t += "<br>";
			}
		}

		return t;
	};

	if (typeof text === "string") return trans(text);

	const txt = [];

	for (let i = 0; i < text.length; i++) {
		txt[i] = trans(text[i]);
	}

	return txt.join("");
};

P.splitSex = function (chara, male, female, futa) {
	if (chara.gender === "male") return male;
	else {
		if (futa && chara.gender === "herm") {
			return futa;
		}
		return female;
	}
};

//根据数组中0位值的条件，返回对应的文本。
window.condP = function (array) {
	for (let i = 0; i < array.length; i++) {
		if (array[i][0] === true) return array[i][1];
		if (array[i][0] === "else") return array[i][1];
	}
};

P.inTime = function (...args) {
	let retxt = "";

	for (let i = 0; i < args.length; i++) {
		if (args[i][0] === "else") {
			retxt = args[i][1];
		} else {
			const t1 = args[i][0];
			const t2 = args[i][1];
			const txt = args[i][2];

			if (Cond.betweenTime(t1, t2)) {
				retxt = txt;
				break;
			}
		}
	}
	return retxt;
};
