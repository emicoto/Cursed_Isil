Macro.add("selects", {
	tags: null,
	handler: function () {
		let { contents, args } = this.payload[0];
		let replace = args.includes("replace");
		let event = args.includes("event");

		if (args.length === 0) {
			return this.error("no selection text specified");
		}

		let sid, output;

		for (let i = 0; i < args.length; i++) {
			if (typeof args[i] === "number") sid = args[i];

			if (args[i] === "replace" || args[i] === "event" || typeof args[i] === "number") {
				args.splice(i, 1);
				i = 0;
			}
		}

		if (event) {
			let txt;
			if (Story.has(`${T.passage}:s${sid}`)) {
				txt = Story.get(`${T.passage + ":s" + sid}`).text;
			}
			contents = `<<set $event.sp to ${sid}>><<set $event.phase to 0>><<if $mode !== 'history'>>${
				txt ? txt.replace("\n", "") : ""
			}${contents}<</if>>`;
			V.event.lastPhase = V.event.phase - 1;
		}

		let style = "neutrallink";

		if (replace) {
			output = `<div class='selection'><<linkreplace ${args[0]}>>
            <<set $selectId to ${sid}>>${contents}<</linkreplace>></div>`;
		} else {
			output = `<div class='selection'><<link '${args[0]}' ${
				args[1] ? `${args[1]}` : "$passage"
			}>>${contents}<</link>>
            </div>`;
		}

		console.log(output);
		jQuery(this.output).wiki(output);
	},
});
