import { Action } from "./Action";
declare function groupmatch(...args: any[]): boolean;
declare var D: typeof window.D;
declare var T: typeof window.T;

const selectedActionBtn = function (name) {
	return `<div class='actions selectAct'>[ ${name} ]</div>`;
};

const getBtnStyle = function (id, part?, state?) {
	const data = Action.data[id];
	const able = Action.able(id, part, 1);
	const order = Action.order(id, part, 1);
	let style = "gray";
	if (able || groupmatch(data.type, "目录", "交流", "固有", "常规")) {
		const select = new SelectCase();
		select
			.case("succeed", "gold")
			.case("luck succeed", "orange")
			.case("force succeed", "blue")
			.case("failed", "red")
			.else("");
		style = select.has(order);
	}
	return style;
};

const createActionBtn = function (currentSelect, actionData, layer) {
	const { id, alterName, type, onReady } = actionData;
	//如果有自定义名称，就用自定义名称。
	let name = actionData.name;
	if (alterName) name = alterName();
	let option = Action.SelectableParts(id);

	//如果是当前选中的，就清除链接并加上选中标记。
	if ((currentSelect == id && Cond.hasSelectableParts(option)) || (type == "目录" && T.actionTypeFilter == id)) {
		return selectedActionBtn(name);
	}

	const inputType = Action.getInputType(id);
	const ready = onReady ? `<<run Action.data['${id}'].onReady() >>` : "";
	const style = getBtnStyle(id);
	const link = layer == 1 ? "link" : "button";

	return `<div class='actions ${style}'><<${link} '${name}'>><<run Action.onInput('${id}', '${inputType}')>>${ready}<</${link}>></div>`;
};

const createOptionBtn = function (actionId, option, selectType) {
	//console.log(actionId, option, selectType);

	let name = D.bodyparts[option];
	if (selectType == "actor") {
		name = `用${name}`;
	}

	//如果是当前选中的，就清除链接并加上选中标记。
	if (selectType == "actor" && T.select.actPart == option) {
		return selectedActionBtn(name);
	}

	const inputType = selectType == "actor" ? "partsOption-actor" : "partsOption-target";
	const style = getBtnStyle(actionId, option);

	return `<div class='actions ${style}'><<button '${name}'>><<run Action.onInput('${actionId}', '${inputType}', '${option}')>><</button>></div>`;
};

const createSystemLinks = function (data) {
	let { name, setting, event, id, alterName } = data;
	if (alterName) name = alterName();
	if (setting) setting = `'${setting}'`;
	else setting = "";

	//console.log(name, option);

	return `<div class='actions'><<link '[ ${name} ]' ${setting}>>${
		event ? `<<run Action.data['${id}'].event(); Action.redraw();>>` : ""
	}<</link>></div>`;
};

//创建目录
const createMenu = function (typelist, outputArray, currentSelect, layer) {
	typelist.forEach((type) => {
		//获取当前类型的所有指令
		const actions = Action.typeFilter(type);
		//遍历指令
		actions.forEach((data) => {
			const { id } = data;
			if (data.filter() && Action.globalFilter(id)) {
				if (id == "Interaction") {
					outputArray[0] = createActionBtn(currentSelect, data, layer);
				} else if (id == "Touch") {
					outputArray[1] = createActionBtn(currentSelect, data, layer);
				} else {
					outputArray.push(createActionBtn(currentSelect, data, layer));
				}
			}
		});
		//
	});
};
