import {
	clothcategory,
	ItemGroup,
	Dict,
	shop,
	clothtags,
	coverparts,
	gender,
	basekey,
	statskey,
	palamkey,
	potionType,
} from "./types";

declare var Db: typeof window.Db;
declare var V: typeof window.V;
declare function getByPath(obj: any, path: string): any;
declare function random(min: number, max: number): number;

//各物品对个属性的影响。正数为加，负数为减，0为不变
//v为影响值，m为影响方法。add为加，mul为乘，fix为固定值
export type ItemStats = Dict<number, statskey>;
export type ItemPalam = Dict<itemEffect, basekey | palamkey>;

export type itemEffect = { v: number; m: itemMethod };
export type itemMethod = "add" | "mul" | "fix";
export type itemEffectType = "recover" | "sustain" | "onetime" | "change" | "fix" | "permanent";
export interface Item {
	id: string; //在库中所登记的id

	name: [string, string?]; //中文名，英文名。英文名可选，若无则为中文名
	des: [string, string?]; //中文描述，英文描述。英文描述可选，若无则为中文描述
	group: ItemGroup; //物品组

	category?: string; //物品类型
	type?: string; //物品分类
	tags?: string[]; //物品标签
	shop?: shop[]; //入手途径或商店种类

	price?: number; //物品价格
	durable?: [number, number]; //耐久度，最大耐久度

	stats?: ItemStats; //物品对个属性的影响
	source?: ItemPalam; //物品对各个状态条的影响
	method?: itemEffectType; //影响方法
}

export interface Potion extends Item {
	group: "Items";
	category: "Potion";
	type: potionType;

	daily?: number; //每日有效使用次数
	lifetime?: number; //终生有效使用次数
	effectsDecrease?: number; //每次使用后效果减少的百分比
	specialEffects?: string; //特殊效果
}

export interface SexToy extends Item {
	group: "Accessory";
	category: "SexToy";

	switch?: boolean; //开关状态
	switchable?: boolean; //是否可开关
	specialEffects?: string; //特殊效果
}

export class Item {
	public static newId(group: string, cate?: string) {
		const len = Db[group].length;
		if (cate) {
			return `${group.toUpperCase()[0]}${cate}_${len}`;
		} else {
			return `${group}_${len}`;
		}
	}
	constructor(name: [string, string?], des: [string, string?] = name, group: ItemGroup = "Items", cate: string = "") {
		this.id = Item.newId(group, cate);
		this.name = name;
		this.des = des;
		this.group = group;
		this.category = cate;
	}
	Price(num: number) {
		this.price = num;
		return this;
	}
	Durable(num: number) {
		this.durable = [num, num];
		return this;
	}
	Shop(...shops: shop[]) {
		this.shop = shops;
		return this;
	}
	Tags(...tags: string[]) {
		this.tags = tags;
		return this;
	}

	Stats(...stats: Array<[statskey, number]>) {
		stats.forEach(([key, add]) => {
			this.stats[key] = add;
		});
		return this;
	}
	Source(...palam: Array<[palamkey | basekey, itemMethod, number]>) {
		palam.forEach(([key, m, v]) => {
			this.source[key] = { m, v };
		});
		return this;
	}
	Method(method: itemEffectType) {
		this.method = method;
		return this;
	}
}

export class Potion extends Item {
	constructor(name: [string, string?], des: [string, string?], type: potionType) {
		super(name, des, "Items", "Potion");
		this.type = type;
	}
	Daily(num: number) {
		this.daily = num;
		return this;
	}
	Lifetime(num: number) {
		this.lifetime = num;
		return this;
	}
	EffectsDecrease(num: number) {
		this.effectsDecrease = num;
		return this;
	}
	SpecialEffects(str: string) {
		this.specialEffects = str;
		return this;
	}
}

export interface Clothes extends Item {
	id: string; //在库中所登记的id,
	uid?: string; //购买时生成的绝对id，6位数字
	group: "Clothes"; //物品组
	category: clothcategory;

	name: [string, string?];
	des: [string, string?];
	shop: shop[];

	gender: gender;
	tags: clothtags[];

	price: number;

	color: [string?, string?]; //默认色,颜色名字
	cover: coverparts[]; //覆盖部位

	expose: 0 | 1 | 2 | 3; //暴露度。0=无，1=若隐若现 2=看的清除但有阻隔 3=完全暴露
	open: 0 | 1 | 2 | 3; //开口。 0=必须脱下，1=敏感区附近有纽扣or纽带可解开，2=敏感区附近有开口 3=完全暴露

	allure: number; //魅力加值，乘数, 范围在 +0.05-0.5 之间
	defence: number; //防御加值，加数, 范围在 0-6 之间

	cursed?: 0 | 1; //是否诅咒物品。如果是则无法脱下
}

export class Clothes extends Item {
	constructor(cate: clothcategory, name: [string, string?], des: [string, string?], gender: gender = "n") {
		super(name, des, "Clothes", cate);
		this.gender = gender;
		this.uid = "0";

		this.tags = [];
		this.price = 0;
		this.color = [];
		this.cover = [];

		this.expose = 3;
		this.open = 3;

		this.allure = 0;
		this.defence = 0;
	}
	UID() {
		this.uid = random(100000, 999999).toString();
		return this;
	}
	Color(colorcode: string, colorname: string) {
		this.color = [colorcode, colorname];
		return this;
	}
	Cover(...parts: coverparts[]) {
		this.cover = parts;
		return this;
	}
	Set(key, value) {
		this[key] = value;
		return this;
	}
}

Object.defineProperties(window, {
	Item: { value: Item },
	Clothes: { value: Clothes },
});
