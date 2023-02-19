//--------------------------------------------------------------
//
// define game property and defalut value here
//
//--------------------------------------------------------------

S.startyear = 4066;

//time setting. year, month, day, weekday, time(minute)
S.date = [4066, 3, 14, 1, 1120];

//default exit link after event
S.defaultExit = "MainLoop";

//default next button text at end of msg
S.defaultNext = "Next Step";

//set the ignore value of the command when check the order
S.ignoreOrder = 20;

//default game mode
S.defaultMode = "event";

//the initial value of palam lv, increasement rule is n*1200 + n*100, n is Lv+1， max lv 10
S.palamLv = [0, 1200, 2500, 3900, 5400, 7000, 8700, 10500, 12400, 14400, 16500];

//the initial value of exp lv, max lv 12
S.expLv = [0, 10, 50, 150, 300, 600, 1000, 1800, 3000, 5000, 8000, 12000, 18000];

//the initial value of abl lv, max lv 20
S.ablLv = [
	0, 20, 50, 100, 300, 800, 1500, 3200, 4800, 6200, 8000, 10000, 12000, 14000, 16000, 18000, 20000, 22000, 24000,
	26000, 28000,
];

//the default order of command for each type
S.orderConfig = {
	touch: 20,
	sextoy: 30,
	tentacles: 50,
	pose: 40,
};

//game config, use 0 or 1 to represent false or true
S.gameConfig = {
	//any config here
	debug: 0,
	alwaysShowPCName: 0,
	showOrder: 0,
	defaultPC: "Isil",
	showPCKojo: 1,
};

//game flags.
S.gameFlags = {
	//interaction mode.
	//0=none target, 1=comunicate, 2=body touch, 3=affection, 4=sex, 5=full control
	mode: 0,
	master: 0,
	phase: 0,
	chapter: 0,

	//law and chaos value, affect the route selection
	law: 0,
	chaos: 0,

	//the available status of each character
	Isil: 1,
	Ayres: 0,
};

//game variables
S.gameVars = {};
