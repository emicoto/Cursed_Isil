F.initSquareData = function () {
	V.mapdata = {};
	let square;

	const initBoards = (path) => {
		const data = GameMap.get(path);
		for (const [key, values] of Object.entries(data)) {
			if (values instanceof Boards) {
				let id = values.id.split(".").pop();
				V.mapdata[id] = {};
				square = setPath(V.mapdata, values.id);
				square.visited = 0;
				square.explore = 0;

				if (values.tags.has("上锁", "封闭", "异次元")) {
					square.locked = 1;
				}

				initBoards(values.id);
			}
			if (values instanceof Spots) {
				initSpots(values.id);
			}
		}
	};
	const initSpots = (path) => {
		const data = GameMap.get(path);
		for (const [key, values] of Object.entries(data)) {
			if (values instanceof Spots) {
				const spot = setPath(V.mapdata, values.id);
				spot.visited = 0;
				spot.explore = 0;

				if (values.tags.has("上锁", "私人", "封闭", "异次元")) {
					spot.locked = 1;
				}

				initSpots(values.id);
			}
		}
	};

	for (const [boardkey, boards] of Object.entries(worldMap)) {
		if (boards instanceof Boards) {
			V.mapdata[boardkey] = {};
			initBoards(boards.id);
		}
	}
};
