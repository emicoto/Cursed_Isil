game.InitStory = function () {
	V.system - S.gameConfig;
	V.flag = S.gameFlags;

	//--------------------系统控制--------------------
	V.ui = {
		overlayer: "",
		currentlayer: "",
		sidebar: false,
	};

	//--------------------游戏记录--------------------
	V.memory = {};
	V.tips = {
		total: 0,
		record: [],
	};
	V.record = {}; //各种游戏记录
	V.archivement = {}; //达成成就
	V.IsilRecord = {}; //伊希露的各种行为记录
	V.AyresRecord = {}; //艾瑞斯的各种行为记录

	V.gametime = { s: 0, m: 0, h: 0, d: 0 };

	//--------------------进程控制--------------------
	V.time = {
		passed: 0,
		total: D.time,
	};

	V.date = {
		year: S.date[0],
		month: S.date[1],
		day: S.date[2],
		time: S.date[3],
	};

	V.event = {};

	V.weather = {
		current: "晴朗",
		temp: 20,
		wind: "微风",
		next: [],
	};

	V.mode = S.defaultMode;

	//--------------------游戏设置--------------------
	V.chara = {};
	V.player = {};
	V.target = {};

	V.pc = "Ayres";
	V.tc = "Isil";

	V.home = {
		path: "Academy.Domitory.S303",
		name: ["宿舍S303"],
		room: ["Bathroom"],
		tags: ["私人", "宿舍"],
		placement: {
			S303: {
				max: 12,
				obj: [
					["床", "单人床"],
					["床", "单人床"],
					["衣柜", "小的木衣柜"],
					["衣柜", "小的木衣柜"],
					["桌子", "木书桌"],
					["桌子", "木书桌"],
					["椅子", "木椅"],
					["椅子", "木椅"],
					["书柜", "木书柜"],
					["镜子", "全身镜"],
					["衣架", "木衣架"],
					["植物", "小型盆栽"],
				],
			},
			Bathroom: {
				max: 5,
				obj: [
					["马桶", "陶瓷马桶"],
					["沐浴间", "莲蓬花洒"],
					["洗手盆", "洗手盆"],
				],
			},
		},
		storage: {},
	};

	V.lastLocation = null;

	//当前地点详情
	//V.location = F.iniLocation("Academy.Dormitory.S303");
	//V.location.chara = ["Isil", "Ayres"];

	//F.initSquareData();

	V.cursedLord = {
		name: "诅咒之触",
		level: 0,
		MP: 0,
		abl: {
			scale: 0,
			len: 0,
			thick: 0,
			num: 0,
			form: 0,
			drug: 0,
			hypnos: 0,
			seed: 0,
		},
	};
};

game.start = function (skip) {
	player.setNames();
	target.setNames();

	if (!skip) {
		F.setEvent("Story", "Opening");
		V.mode = "event";
	} else {
		F.setMemory("SE_0", "序章 - 故事开头");
		V.mode = "normal";
	}
	if (T.futa == 2) {
		for (let i in V.chara) {
			V.chara[i].gender = "herm";
			V.chara[i].initSexOrgan("v");
			if (V.chara[i].resetVirginity) {
				V.chara[i].resetVirginity();
			}
		}
	}

	if (T.lesCP) {
		V.chara["Isil"].gender = "female";
		V.chara["Isil"].initVirginity();
		delete V.chara["Isil"].sexstats.p;

		V.chara["Ayres"].gender = "female";
		V.chara["Ayres"].initVirginity();
		V.chara["Ayres"].resetVirginity();
		delete V.chara["Ayres"].sexstats.p;
	}

	if (T.newbie) {
		for (let i in V.chara) {
			V.chara[i].initExp().initVirginity();
		}
	}
};
