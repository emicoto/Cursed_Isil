import { Dict } from "../types";

declare function groupmatch(value, ...args): boolean;
declare function slog(type: "log" | "warn" | "error", ...args): void;

export interface Action {
	id?: string;
	name?: string;
	time?: number;
	mode?: number;
	actPart?: string[];
	targetPart?: string[];
	setting?: any;
	template?: string;
	type?: string;
	autokeep?: boolean;
	tags?: string[];
	placement?: string[];
	forceAble?: boolean;
	options?: string | string[];

	filter?: (arg?, ...args) => 0 | 1;
	check?: (arg?, ...args) => 0 | 1;
	order?: (arg?, ...args) => 0 | 1;
	effect?: (arg?, ...args) => any;
	alterName?: (...args) => string;
	onReady?: (...args) => any;
	event?: (...args) => any;
}
/**
 * @fileoverview Actions
 * @version 1.0.0
 * @license MIT
 * @namespace Action
 *
 * @author LuneFox
 * @description
 * 1.0.0
 */
export class Action {
	public static data: Dict<Action>;
	public static kojo: any;
	static makeGroup: string;

	public static makeTemplate: (data, mode) => string;
	public static output: (data, mode) => void;

	public static typeFilter(...types) {
		return Object.values(Action.data).filter((action) => types.includes(action.type));
	}

	//-------------------------------------------------------------//
	//
	// get and set Action
	//
	//-------------------------------------------------------------//
	public static add(id: string, type: string, obj) {
		Action.data[id] = new Action(type, obj);
		return Action.data[id];
	}
	public static get(arg, ...args) {
		switch (arg) {
			case "actPart":
				if (!args[0]) {
					slog("warn", "No args for actPart");
					return [];
				}
				return Object.values(Action.data).filter((action) => action.actPart && action.actPart.has(args));
			case "targetPart":
				if (!args[0]) {
					slog("warn", "No args for targetPart");
					return [];
				}
				return Object.values(Action.data).filter((action) => action.targetPart && action.targetPart.has(args));
			case "type":
				if (!args[0]) {
					slog("warn", "No args for type");
					return [];
				}
				return Object.values(Action.data).filter((action) => action.type == args[0]);
			default:
				return Object.values(Action.data).filter((action) => action.name == arg || action.id == arg);
		}
	}
	public static set(id) {
		if (!Action.data[id]) {
			slog("error", "Error occured when setting action: " + id);
			return new Action("error", { name: "Error", id: "error" });
		}
		return Action.data[id];
	}

	//-------------------------------------------------------------//
	//
	// Action constructor
	//
	//-------------------------------------------------------------//
	constructor(type, action: any) {
		this.type = type;

		//copy and set default value
		for (let key in action) {
			let value = action[key];
			//if is empty, skip
			if (!value) continue;
			//if is number, convert to number
			if (typeof value === "string" && !isNaN(Number(value))) {
				value = Number(value);
			}
			//if has |, split and convert to array
			if (typeof value === "string" && value.indexOf("|") > -1) {
				value = value.split("|");
			}

			if (groupmatch(value, "true", "yes", "y")) {
				value = true;
			}
			if (groupmatch(value, "false", "no", "n")) {
				value = false;
			}

			this[key] = value;
		}

		if (this.type == "Tentacles") {
			this.actPart = ["tentacles"];
		}

		this.filter = (...arg) => {
			return 1;
		};

		this.check = (...arg) => {
			return 1;
		};
		this.order = (...arg) => {
			return 1;
		};
	}

	Check(callback) {
		this.check = callback;
		return this;
	}
	Filter(callback) {
		this.filter = callback;
		return this;
	}
	Order(callback) {
		this.order = callback;
		return this;
	}
	Effect(callback) {
		this.effect = callback;
		return this;
	}
	Name(calback) {
		this.alterName = calback;
		return this;
	}
	ForceAble() {
		this.forceAble = true;
		return this;
	}
	AutoKeep() {
		this.autokeep = true;
		return this;
	}
	Ready(callback) {
		this.onReady = callback;
		return this;
	}
	Options(str: string | string[]) {
		this.options = str;
		return this;
	}
	Set(key: string, value: any) {
		this[key] = value;
		return this;
	}
	Event(callback) {
		this.event = callback;
		return this;
	}
}

Action.data = {};
Action.kojo = {};
