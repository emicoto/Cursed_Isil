//beauty=ALR*100+wearbuff+traitbuff

Fix.beauty = function (chara) {
	const traitbuff = function (chara) {
		let buff = 1;

		if (chara.talent.includes("破相")) buff = 0.1;
		if (chara.talent.includes("雌雄莫辨")) buff *= 1.5;

		if (chara.race === "elvin" && chara.talent.has("高等精灵")) buff *= 1.5;
		else if (chara.race === "elvin") buff *= 1.1;

		if (chara.race === "catvinx") buff *= 1.2;
		if (chara.race === "drawf") buff *= 0.5;
		if (chara.race === "goblin") buff *= 0.3;
		if (chara.race === "orc") buff *= 0.2;

		console.log(chara.name, "beautybuff", buff);

		return buff;
	};

	const basic = function (chara) {
		return chara.stats.ALR[1] * 100 * traitbuff(chara);
	};

	const factor = function (v, chara) {
		let allure = 0;

		for (const [k, c] of Object.entries(chara.equip)) {
			if (c?.allure) allure += c.allure;
		}

		return Math.floor(v * allure + 0.5);
	};

	const v = Math.floor(basic(chara) + 0.5);
	return v + factor(v, chara);
};

Chara.getScar = function (chara, part, type, count, times) {
	const skin = chara.scars;
	if (!times) times = 1;
	for (let i = 0; i < times; i++) {
		skin[part].push([type, count]);
	}
	return "";
};

Chara.skinCounter = function (chara, t) {
	//对各皮肤图层上各伤痕计数器进行计算。
	const dolayer = function (layer, t) {
		for (let i = 0; i < layer.length; i++) {
			let k = layer[i];
			if (typeof k[1] == "number") {
				k[1] -= t;
				if (k[1] <= 0 && k[0] !== "wound") {
					layer.splice(i, 1);
					i--;
				} else if (k[1] <= 0) {
					k[0] = "scar";
					k[1] = "never";
				}
			}
		}
	};

	//记录结果
	const total = {};

	//统计伤痕, whip鞭痕, scar伤疤, wound创伤, pen笔迹, bruise淤痕, kissmark吻痕
	const collect = (skin) => {
		for (let i in skin) {
			if (i == "total" || i == "detail") continue;

			let layer = skin[i];
			dolayer(layer, t);
			total[i] = {};
			D.scarType.forEach((type) => {
				total[i][type] = countArray(layer, type);
			});
		}
		return total;
	};

	const count = () => {
		const result = {};

		D.scarType.forEach((type) => {
			result[type] = [0, []];
		});

		for (let i in total) {
			for (let k in total[i]) {
				if (total[i][k] > 0) {
					result[k][0] += total[i][k];

					const detail = [i, total[i][k]];
					result[k][1].push(detail);
				}
			}
		}
		return result;
	};

	const skinlayer = chara.scars;
	collect(skinlayer);
	chara.scars.total = count();

	return total;
};

Chara.init = function () {
	V.chara = {};

	for (let i in Chara.data) {
		V.chara[i] = Chara.data[i]();
	}

	Story.lookup("tags", "csv").forEach((data) => {
		if (data.title.includes("CharaSheet")) {
			let cid = data.title.replace("CharaSheet_", "");
			V.chara[cid] = Chara.initCSV(cid);
		}
	});

	Chara.initGlobal();

	for (let i in V.chara) {
		Fix.base(V.chara[i], 1);
		F.resetBase(V.chara[i]);
	}

	//游戏初始化时才初始化口上侧登录的自定义动作。
	Action.initKojo();
	for (let chara in Action.kojo) {
		Action.kojo[chara]();
	}

	//通过Kojo的设定补充角色各变量设定
	for (const [cid, data] of Object.entries(Kojo.data)) {
		if (data.sleeptime) {
			V.chara[cid].flag.sleeptime = data.sleeptime;
		}
		if (data.wakeuptime) {
			V.chara[cid].flag.wakeuptime = data.wakeuptime;
		}
		if (data.home) {
			V.chara[cid].flag.startplace = data.home.split(",");
		}
	}

	V.master = "m0";
	V.pc = "Ayres";
	V.tc = "Isil";
};
//修正基础属性
Fix.base = function (chara, mode) {
	const { base, stats, race, traits } = chara;

	if (chara.id == "m0") {
		chara.base = clone(C.Ayres.base);
	}

	base.health[1] = Math.floor(stats.CON[1] * 50 * F.raceBonus(race, "health") + 0.5);
	base.stamina[1] = Math.floor(stats.STR[1] * 50 * F.raceBonus(race, "stamina") + 0.5);
	base.sanity[1] = stats.WIL[1] * 10;
	base.mana[1] = stats.INT[1] * 25 * F.raceBonus(race, "mana");

	traits.forEach((key) => {
		const trait = Trait.get(key);
		if (trait?.onFix) trait.onFix(base);
	});

	if (mode) {
		base.health[0] = base.health[1];
		base.stamina[0] = base.stamina[1];
		base.sanity[0] = base.sanity[1];
		base.mana[0] = base.mana[1];

		Fix.stats(chara);
	}
};
//修正角色的属性
Fix.stats = function (chara) {
	const { stats, equip, race } = chara;

	if (chara.id === "m0") {
		chara.stats = clone(C.Ayres.stats);
		return;
	}

	stats.ATK[0] = Math.floor(stats.STR[1] * 2 * F.raceBonus(race, "ATK") + 0.5);
	stats.DEF[0] = Math.floor(stats.CON[1] * 2 * F.raceBonus(race, "DEF") + 0.5);
	stats.MTK[0] = Math.floor(stats.INT[1] * 2 * F.raceBonus(race, "MTK") + 0.5);
	stats.MDF[0] = Math.floor(stats.WIL[1] * 2 * F.raceBonus(race, "MDF") + 0.5);
};

F.raceBonus = function (race, type) {
	const races = Object.keys(D.race);
	const P = {
		//health+stamina+mana = 3.3
		//atk+def+mtk+mdf=4.4
		health: [1.1, 0.7, 1, 1.3, 1, 0.8, 1, 1.3, 1.6, 1.4, 1, 1],
		stamina: [1.1, 0.6, 1, 1.3, 1.5, 2, 1, 2, 1.6, 1.4, 1, 1.2],
		mana: [1.1, 2, 1.3, 0.5, 0.8, 0.5, 1.3, 0.7, 0.1, 0.5, 1.3, 1.1],
		ATK: [1.1, 0.5, 1, 1.4, 1.2, 1, 1, 1.4, 2, 1.4, 1, 1.2],
		DEF: [1.1, 0.6, 1, 1, 1.6, 1, 0.8, 1.2, 1.8, 1.5, 1, 1.1],
		MTK: [1.1, 1.8, 1.2, 0.8, 0.6, 1, 1.4, 0.8, 0.1, 0.5, 1, 1],
		MDF: [1.1, 1.5, 1.2, 1.2, 1, 2, 1.2, 1, 0.5, 0.6, 1.4, 1.1],
	};

	return P[type][races.indexOf(race)];
};

Chara.initGlobal = function () {
	for (let i in V.chara) {
		if (i == "m0") continue;

		Object.defineProperty(Base, i, {
			get: function () {
				return V.chara[i].base;
			},
		});

		Object.defineProperty(Stats, i, {
			get: function () {
				return V.chara[i].Stats;
			},
		});

		Object.defineProperty(Palam, i, {
			get: function () {
				return V.chara[i].palam;
			},
		});

		Object.defineProperty(Source, i, {
			get: function () {
				return V.chara[i].source;
			},
		});

		Object.defineProperty(Sup, i, {
			get: function () {
				return V.chara[i].sup;
			},
		});

		Object.defineProperty(Cflag, i, {
			get: function () {
				return V.chara[i].flag;
			},
		});

		Object.defineProperty(Tsv, i, {
			get: function () {
				return V.chara[i].tsv;
			},
		});

		Object.defineProperty(Exp, i, {
			get: function () {
				return V.chara[i].exp;
			},
		});
	}
};
