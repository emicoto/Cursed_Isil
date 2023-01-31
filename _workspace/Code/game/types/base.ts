export type P = [number, number];

export type Dict<T = any, K extends string = any> = {
	[key in K]?: T;
};

export type race =
	| "human"
	| "elvin"
	| "wolves"
	| "drawf"
	| "goblin"
	| "catvinx"
	| "centaur"
	| "deamon"
	| "orc"
	| "titan";

export type jobclass = "scholar" | "mage" | "ranger" | "medics" | "warrior" | "alchemist" | "";

export type statskey = "ATK" | "DEF" | "MTK" | "MDF" | "STR" | "CON" | "DEX" | "INT" | "WIL" | "PSY" | "ALR" | "LUK";

export type basekey =
	| "health"
	| "stamina"
	| "sanity"
	| "mana"
	| "drug"
	| "alcohol"
	| "dirty"
	| "stress"
	| "hydration"
	| "nutrient";

export type palamkey =
	| "ecstacy"
	| "arousal"
	| "surrend"
	| "fear"
	| "mortify"
	| "pain"
	| "depress"
	| "resist"
	| "favo"
	| "eager"
	| "angry"
	| "satisfy"
	| "ecM"
	| "ecB"
	| "ecC"
	| "ecU"
	| "ecV"
	| "ecA"
	| "paM"
	| "paB"
	| "paC"
	| "paU"
	| "paV"
	| "paA";

export type ablkey =
	| "magica"
	| "lumen"
	| "ark"
	| "flare"
	| "ions"
	| "vitae"
	| "terra"
	| "electron"
	| "sword"
	| "wrestle"
	| "cooking"
	| "plant"
	| "medicine"
	| "craft"
	| "fishing"
	| "gathering";

export type sblkey =
	| "knowledge"
	| "technique"
	| "endurance"
	| "submissive"
	| "refuse"
	| "hypnosis"
	| "desire"
	| "service"
	| "exhibition"
	| "promscuity"
	| "sexaddic"
	| "drugaddic"
	| "masochist"
	| "semenaddic"
	| "analejac"
	| "vagiejac"
	| "deviancy"
	| "gangbang"
	| "tentacles";

export type expkey =
	| "M"
	| "B"
	| "C"
	| "U"
	| "V"
	| "A"
	| "M高潮"
	| "B高潮"
	| "C高潮"
	| "U高潮"
	| "V高潮"
	| "A高潮"
	| "高潮"
	| "强烈高潮"
	| "深度强烈高潮"
	| "多重高潮"
	| "接吻"
	| "射精"
	| "喷乳"
	| "放尿"
	| "饮精"
	| "肛交"
	| "性交"
	| "乳交"
	| "口交"
	| "内射"
	| "肛射"
	| "乳头开发"
	| "后穴开发"
	| "尿道开发"
	| "子宫开发"
	| "插入"
	| "道具"
	| "受虐"
	| "露出"
	| "被拍摄"
	| "怀孕"
	| "产卵"
	| "轮奸"
	| "兽奸"
	| "触手奸"
	| "眠奸"
	| "强奸"
	| "迷奸"
	| "性转"
	| "同性"
	| "爱情"
	| "侍奉"
	| "自慰"
	| "嗑药"
	| "服从"
	| "催眠"
	| "调教"
	| "施虐";

export type markkey = "hypno" | "ecstacy" | "surrend" | "pain" | "fear" | "humil" | "resit";
