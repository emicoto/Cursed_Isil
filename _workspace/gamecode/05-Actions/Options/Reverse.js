//:: Action_Reverse_Option[script]
/* 口交 */
Action.set("r0")
	.Filter(() => {
		return 1;
	})
	.Check(() => {
		return 1;
	})
	.Order(() => {
		return 0;
	});

/* 逆性交 */
Action.set("r1")
	.Filter(() => {
		return 1;
	})
	.Check(() => {
		return 1;
	})
	.Order(() => {
		return 0;
	});

/* 收紧 */
Action.set("r2")
	.Filter(() => {
		return T.inside;
	})
	.Check(() => {
		return 1;
	})
	.Order(() => {
		return 0;
	});
