export * from "./Clothes";
export * from "./item";
export * from "./misc";
import { Clothes } from "./Clothes";
import { Items } from "./item";
import { Potion, SexToy, Recipies } from "./misc";

declare var Db: typeof window.Db;
declare function slog(type: string, ...args: any[]): void;
declare function dlog(type: string, ...args: any[]): void;
declare function getJson(url: string): Promise<any>;
declare function loadJson(url: string): Promise<any>;

async function loadItemsConfig() {
	const file = await loadJson("./data/items/config.json");
	if (file) {
		for (let i in file) {
			D[i] = file[i];
		}
	}
}

async function loadItems() {
	const filesdata = await getJson("./data/items.json").then((res) => {
		slog("log", "Items loaded:", res);
		return res;
	});

	if (filesdata) {
		filesdata.forEach(([filename, filedata]) => {
			dlog("log", "Loading items from:", filename);
			filedata.forEach((data) => {
				const { name, group, category, source, sourceMethod } = data;
				const id = Items.newId(group, name, category);
				Db.Items[group].set(id, new Items(data));

				const idata = Db.Items[group].get(id);
				idata.source = {};
				if (source) {
					for (let i in source) {
						if (typeof source[i] === "number") {
							idata.source[i] = { v: source[i], m: sourceMethod };
						} else {
							idata.source[i] = source[i];
						}
					}
				}
			});
		});
	}

	slog("log", "All items loaded:", Db.Items);
}

const modules = {
	name: "Items",
	version: "1.0.0",
	des: "A module for items system.",
	database: Items.data,
	classObj: {
		Items,
		Clothes,
		Potion,
		SexToy,
		Recipies,
	},
	func: {
		Init: {
			loadItemsConfig,
			loadItems,
		},
	},
	Init: ["loadItemsConfig", "loadItems"],
};

declare function addModule(modules): boolean;
addModule(modules);
